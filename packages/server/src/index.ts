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
import { Entity, Player } from "@shared/types/common";
import { CHANNEL_NAME } from "@shared/constants";


import { ControllerEvent } from "@shared/types/ControllerEvent";
import { ControlScreenEvent } from "@shared/types/ControlScreenEvent";
import { DisplayScreenEvent } from "@shared/types/DisplayScreenEvent";
import { PlayerInputEvent } from "@shared/types/PlayerInputEvent";
import { StateChangeEvent } from "@shared/types/StateChangeEvent";

import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { ServerToClientEvent } from "@shared/types/event";

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

type State = {
  players: ReadonlyArray<Player>
}
io.on("connection", (socket) => {
  // TODO handle this much better than that !
  let state: State = {
    players: [{
      id: uuidv4(),
      name: 'fabien',
      photo: 'data:image/jpeg;base64,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'
    }]
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

  const { socketId: emitterId } = socket.handshake.query;

  console.log("Incoming connection from: ", emitterId);

  sockets[emitterId as keyof typeof Entity] = socket;

  const emit = ({
      target, action, payload
  }:
    Omit<ControlScreenEvent, 'source' > |
    Omit<DisplayScreenEvent, 'source' > |
    Omit<PlayerInputEvent, 'source' > |
    Omit<StateChangeEvent, 'source' >
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
    if (action === '__UPDATE_STATE__') {
      const { payload } = event
      const {
        path,
        value
      } = payload

      updateState(path, value)    
    }

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
            const { payload } = event
            emit({
             target: Entity.DISPLAY_SCREEN,
             action: "ACK_DART_LAND",
             payload
            })
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
