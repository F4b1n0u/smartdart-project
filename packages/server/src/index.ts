import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT_EXPRESS, PORT_SOCKET_IO , HOST_CORS } from "./config";
import { CHANNEL_NAME } from "@shared/constants";
import type { AppState, Client, ClientReceiver, Player } from "@shared/types/common";
import type { FromClientEvent, ToClientEvent } from "@shared/types/events/utils/ClientEvent";
import type { ClientToServerMessages,
  InterServerMessages,
  ServerToClientMessages,
  Sockets, } from "@shared/types/socketio";
import { Topic, GameId, Entity } from '@shared/types/common';
import { createLogger, format, transports } from 'winston';
import util from 'util';

import { GAMES_CONFIG_MAP } from '@shared/games/constants'

const { combine, timestamp, printf, colorize } = format;
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'errors.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

const log = (level: string, ...args: unknown[]) => {
  const formattedArgs = args.map(arg => 
    typeof arg === 'object' ? util.inspect(arg, { depth: 3, colors: true }) : arg
  ).join(' ');
  logger.log(level, formattedArgs);
};

const app = express();
const httpServer = createServer(app);

const CORS_SETTINGS = {
  origin: `http://${HOST_CORS}:${PORT_EXPRESS}`,
  credentials: true,
};

const io = new Server<
  ClientToServerMessages,
  ServerToClientMessages,
  InterServerMessages,
  unknown
>(httpServer, {
  cors: {
    ...CORS_SETTINGS,
    methods: ["GET", "POST"],
  },
});

// Use CORS middleware for Express
app.use(cors(CORS_SETTINGS));

const receiver = Entity.CONTROLLER;
const sockets: Sockets = {};

// TODO handle this much better than that !
let state: AppState = {
  status: 'READY_TO_PLAY',
  selectedGameId: GameId.GAME_A,
  game: undefined,
  players: [],
  dpad: {
    status: 'INACTIVE'
  },
  dartboardConnection: 'MISSING'
}

io.on("connection", (socket) => {
  
  const emitterId = socket.handshake.query.emitter as Client;
  log('info', "Incoming connection from: ", emitterId);

  sockets[emitterId] = socket;

  const emit = ({
    topic, action, payload, target
  }: Omit<ToClientEvent, 'source'>
  ) => {
    const event = {
      action,
      payload,
      topic,

      target,
      source: Entity.CONTROLLER,
    };
    log('info', `emits to ${event.target} -> `, event);

    const socket = sockets[target as Client];

    if (socket) {
      // TODO check why I had to do this cast
      socket.emit?.(CHANNEL_NAME, event as ToClientEvent);
    } else {
      console.error(`the socket "${target}" is not registered`);
    }
  };

  function handleNewMessage(event: FromClientEvent) {
    log('info', "receives <- ", event);

    const { onEvent } = GAMES_CONFIG_MAP[state.selectedGameId]

    const broadcastState = (state: AppState) => {
      const targets = Object.keys(sockets)
      targets.forEach((target) => {
        emit?.({
          topic: Topic.STATE,
          action: 'SEND_LAST_APP_STATE',
          payload: {
            state,
            lastEvent: event,
          },
          target: target as ClientReceiver
        })
      })
    }

    type Update = { path: string, value: unknown }
    const updateState = (update: (Update | Update[])) => {
      const updates: Update[] = Array.isArray(update) ? update : [update];
      
      updates.forEach(({
        value, path
      }) => {
        state = set(state, path, value)
      })
      
      broadcastState(state)
    }

    const { topic, action, source, target } = event;

    if (target !== receiver) {
      // we do not handle event forwarding yet (if ever), only event that are for the controller (server)
      return;
    }

    if (action === 'REQUEST_FULL_APP_STATE') {
      emit?.({
        topic: Topic.STATE,
        target: source as ClientReceiver,
        action: 'SEND_LAST_APP_STATE',
        payload: {
          state,
          lastEvent: event
        }
      })

      return;
    }

    switch (topic) {
      case Topic.PLAYERS: {
        switch (action) {
          case 'ADD_PLAYER': {
            const { payload } = event

            const newPlayers: Array<Player> = [
              ...state.players, {
                id: uuidv4(),
                name: payload.name,
                photo: payload.photo,
              }
            ]
            
            updateState({ path: 'players', value: newPlayers })

            break;
          }
          case 'REMOVE_PLAYER': {
            const { players } = state
            const { payload } = event
            
            const newPlayers: Array<Player> = players.filter(player => player.id !== payload.id);
            updateState({ path: 'players', value: newPlayers })

            break;
          }
        }
        break;
      }

      case Topic.DARTBOARD: {
        switch (action) {
          case 'NOTIFY_CONNECTION_ESTABLISHED': {
            updateState({ path: 'dartboardConnection', value: true })
            break;
          }
        }
        break;
      }

      case Topic.GAMES: {
        switch (action) {
          case 'SELECT_GAME': {
            const { payload } = event
            updateState({ path: 'selectedGameId', value: payload })
            break;
          }
          case 'START_SELECTED_GAME': {
            updateState({ path: 'status', value: 'PLAYING_GAME' })
            break;
          }
        }
        break;
      }
    
      case Topic.GAME: {
        switch(action) {
          case 'UPDATE_GAME_STATE': {
            const { payload } = event
            updateState({ path: 'game', value: payload })
            break;
          }
        }
        break;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedGameState = onEvent(event, state as any, emit)

    if (updatedGameState) {
      updateState({ path: 'game', value: updatedGameState })
    }
  }

  socket.on(CHANNEL_NAME, handleNewMessage);
});

// httpServer.listen(PORT_EXPRESS, () => {
//   log('info', `Express server running on port ${PORT_EXPRESS}`);
//   log('info', "CORS_SETTINGS: ", CORS_SETTINGS);
// });

io.listen(PORT_SOCKET_IO)
