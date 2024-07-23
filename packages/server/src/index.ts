import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import {
  ClientToServerMessages,
  InterServerMessages,
  ServerToClientMessages,
  SocketData,
  Sockets,
} from "./types/socketio";
import { PORT_EXPRESS, PORT_SOCKET_IO , HOST_CORS } from "./config";
import { CHANNEL_NAME } from "@shared/constants";

import type { AppState } from "@shared/types/common";
import type { ControllerEvent } from "@shared/types/events/ControllerEvent";
import type { ServerToClientEvent } from "@shared/types/events/common";
import { Entity } from '@shared/types/common';


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
  SocketData
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

  const broadcastState = (state: unknown) => {
    emit({
      target: Entity.CONTROL_SCREEN,
      action: 'NOTIFY_STATE_CHANGE',
      payload: state
    })
    emit({
      target: Entity.DARTBOARD,
      action: 'NOTIFY_STATE_CHANGE',
      payload: state
    })
    emit({
      target: Entity.DISPLAY_SCREEN,
      action: 'NOTIFY_STATE_CHANGE',
      payload: state
    })
    // emit({
    //   target: Entity.PLAYER_INPUT,
    //   action: 'NOTIFY_STATE_CHANGE',
    //   payload: state
    // })
  }

  const updateState = (path: string, value: unknown) => {
    state = set(state, path, value)
    broadcastState(state)
  }

  const emitterId = socket.handshake.query.emitterEntityId as Entity;

  console.log("Incoming connection from: ", emitterId);

  sockets[emitterId] = socket;

  const emit = ({
      target, action, payload
  }: Omit<ServerToClientEvent, 'source'>
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
      socket.emit(CHANNEL_NAME, event as ServerToClientEvent);
    } else {
      console.error(`the socket "${target}" is not registered`);
    }
  };

  function handleNewMessage(event: ControllerEvent) {
    console.log("receives <- ", event);

    const { action, source, target } = event;

    if (target !== receiver) {
      return;
    }

    // AVOID USING THIS !
    // if (action === '__UPDATE_STATE__') {
    //   const { payload } = event
    //   const {
    //     path,
    //     value
    //   } = payload

    //   updateState(path, value)    
    // }

    if (action === 'GET_STATE') {
      broadcastState(state)
    }

    switch (source) {
      case Entity.PLAYER_INPUT: {
        break;
      }
      case Entity.CONTROL_SCREEN: {
        switch (action) {
          case "ADD_PLAYER": {
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
          case "REMOVE_PLAYER": {
            const { players } = state
            const { payload } = event
            
            const newPlayers = players.filter(player => player.id !== payload.id);
            updateState('players', newPlayers)

            break;
          }
          case "MISS_THROW": {
            
            break;
          }

          case 'SIMULATE_THROW': {
            emit({
              target: Entity.CONTROL_SCREEN,
              action: "DISABLE_REMAINING_THROW",
              payload: undefined
             })
            break;
          }
        }

        break;
      }
      case Entity.DARTBOARD: {
        switch (action) {
          case "CONNECTION_ACK": {
            // TODO update state to reflec the connection status
            break;
          }
          case "REGISTER_THROW": {
            // TODO update current game and emit updated state
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
