import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT_EXPRESS, PORT_SOCKET_IO , HOST_CORS } from "./config";
import { CHANNEL_NAME } from "@shared/constants";

import type { AppState, Client, ClientReceiver } from "@shared/types/common";
import type { ToClientEvent } from "@shared/types/events/utils/ToClientEvent";
import type { FromClientEvent } from "@shared/types/events/utils/FromClientEvent";
import type { ClientToServerMessages,
  InterServerMessages,
  ServerToClientMessages,
  Sockets, } from "@shared/types/socketio";
import { Topic, GameId, Entity } from '@shared/types/common';


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
  game: {},
  players: [],
  dpad: {
    status: 'INACTIVE'
  },
}

io.on("connection", (socket) => {
  const broadcastState = (state: AppState) => {
    const targets = Object.keys(sockets)
    targets.forEach((target) => {
      emit({
        topic: Topic.STATE,
        action: 'NOTIFY_STATE_CHANGE',
        payload: state,
        target: target as ClientReceiver
      })
    })
  }

  const updateState = (path: string, value: unknown) => {
    state = set(state, path, value)
    broadcastState(state)
  }

  const emitterId = socket.handshake.query.emitter as Client;
  console.log("Incoming connection from: ", emitterId);

  sockets[emitterId] = socket;

  const emit = ({
    topic, action, payload, target
  }: Omit<ToClientEvent, 'source'>
  ) => {
    const event= {
      action,
      payload,
      topic,

      target,
      source: Entity.CONTROLLER,
    };
    console.log(`emits to ${event.target} -> `, event);

    const socket = sockets[target as Client];

    if (socket) {
      // TODO check why I had to do this cast
      socket.emit(CHANNEL_NAME, event as ToClientEvent);
    } else {
      console.error(`the socket "${target}" is not registered`);
    }
  };

  function handleNewMessage(event: FromClientEvent) {
    console.log("receives <- ", event);

    const { topic, action, source, target } = event;

    if (target !== receiver) {
      // we do not handle event forwarding yet (if ever), only event that are for the controller (server)
      return;
    }

    if (action === 'REQUEST_FULL_APP_STATE') {
      emit({
        topic: Topic.STATE,
        target: source as ClientReceiver,
        action: 'NOTIFY_STATE_CHANGE',
        payload: state
      })
    }

    switch (topic) {
      case Topic.D_PAD: {
        // TODO implement the dpad for non playing players
        break;
      }

      case Topic.PLAYERS: {
        switch (action) {
          case 'ADD_PLAYER': {
            const { payload } = event
            const newPlayers = [
              ...state.players, {
                id: uuidv4(),
                name: payload.name,
                photo: payload.photo,
              }
            ]
            
            updateState('players', newPlayers)

            break;
          }
          case 'REMOVE_PLAYER': {
            const { players } = state
            const { payload } = event
            
            const newPlayers = players.filter(player => player.id !== payload.id);
            updateState('players', newPlayers)

            break;
          }
        }
        break;
      }

      case Topic.THROWS: {
        switch (action) {
          case 'MISS_THROW': {
            break;
          }
          
          case 'SIMULATE_THROW': {
            break;
          }
        }

        break;
      }

      case Topic.DARTBOARD: {
        switch (action) {
          case 'REGISTER_THROW': {
            break;
          }
        }
        break;
      }

      case Topic.GAMES: {
        switch (action) {
          case 'SELECT_GAME': {
            const { payload } = event
            updateState('selectedGameId', payload)
            break;
          }
          case 'START_SELECTED_GAME': {
            updateState('status', 'PLAYING_GAME')
            break;
          }
        }
      }
      
    }
  }

  socket.on(CHANNEL_NAME, handleNewMessage);
});

httpServer.listen(PORT_EXPRESS, () => {
  console.log(`Express server running on port ${PORT_EXPRESS}`);
  console.log("CORS_SETTINGS: ", CORS_SETTINGS);
});

io.listen(PORT_SOCKET_IO)
