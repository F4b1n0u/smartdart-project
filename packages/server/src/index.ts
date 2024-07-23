import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT_EXPRESS, PORT_SOCKET_IO , HOST_CORS } from "./config";
import { CHANNEL_NAME } from "@shared/constants";

import type { AppState } from "@shared/types/common";
import type { ToClientEvent } from "@shared/types/events/ToClientEvent";
import type { FromClientEvent } from "@shared/types/events/FromClientEvent";
import type { ClientToServerMessages,
  InterServerMessages,
  ServerToClientMessages,
  Sockets, } from "@shared/types/socketio";
import { Entity, ClientEntity, CLIENT_ENTITIES } from '@shared/types/common';


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

io.on("connection", (socket) => {
  // TODO handle this much better than that !
  let state: AppState = {
    app: {
      status: 'READY_TO_PLAY'
    },
    game: {},
    players: [],
    throwManager: {
      currentPlayerId: undefined,
      throwsByPlayerId: {}
    },
    dpad: {
      status: 'INACTIVE'
    },
  }

  const broadcastState = (state: AppState) => {
    CLIENT_ENTITIES.forEach((target) => {
      emit({
        target,
        action: 'NOTIFY_STATE_CHANGE',
        payload: state
      })
    })
  }

  const updateState = (path: string, value: unknown) => {
    state = set(state, path, value)
    broadcastState(state)
  }

  const emitterId = socket.handshake.query.emitter as Entity;

  console.log("Incoming connection from: ", emitterId);

  sockets[emitterId] = socket;

  const emit = ({
      target, action, payload
  }: Omit<ToClientEvent, 'source'>
  ) => {
    const event = {
      action,
      source: Entity.CONTROLLER,
      target,
      payload,
    };
    console.log(`emits to ${target} -> `, event);

    const socket = sockets[target];

    if (socket) {
      // TODO check why I had to do this cast
      socket.emit(CHANNEL_NAME, event as ToClientEvent);
    } else {
      console.error(`the socket "${target}" is not registered`);
    }
  };

  function handleNewMessage(event: FromClientEvent) {
    console.log("receives <- ", event);

    const { action, source, target } = event;

    if (target !== receiver) {
      return;
    }

    switch (source) {
      case Entity.PLAYER_INPUT: {
        if (action === 'GET_FULL_APP_STATE') {
          broadcastState(state)
        }
        break;
      }

      case Entity.PLAYER_MANAGER: {
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

      case Entity.THROW_MANAGER: {
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

      case Entity.DARTBOARD: {
        switch (action) {
          case 'REGISTER_THROW': {
            break;
          }
        }
        break;
      }

      case Entity.GAME_SELECTOR: {
        switch (action) {
          case 'FOCUS_GAME': {
            break;
          }
          case 'START_GAME': {
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
