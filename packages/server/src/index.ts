import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import {
  CHANNEL_NAME,
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketEvent,
} from "./types/socketio";

const app = express();
const httpServer = createServer(app);

const SERVER_HOST = "0.0.0.0";
const CLIENT_HOST = process.env.HOST || "localhost";
const CLIENT_PORT = 5173;

const CORS_SETTINGS = {
  origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
  credentials: true,
};

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    ...CORS_SETTINGS,
    methods: ["GET", "POST"],
  },
});

const BACKEND_PORT = 8080;

// Use CORS middleware for Express
app.use(cors(CORS_SETTINGS));

const NAMESPACE_SEPARATOR = ":";

const receiver = "Controller";

enum TARGETS {
  Dartboard = "Dartboard",
  MainScreen = "MainScreen",
  ThrowManager = "ThrowManager",
  PlayerInput = "PlayerInput",
}

type Sockets = Partial<{
  [key in TARGETS]: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
}>;

const sockets: Sockets = {};

io.on("connection", (socket) => {
  const { namespace: emitter } = socket.handshake.query;

  console.log("Incoming connection from: ", emitter);

  sockets[emitter as keyof typeof TARGETS] = socket;

  const emit = (target: TARGETS | TARGETS[], topic: string, payload: any) => {
    let targets = target;
    if (!Array.isArray(target)) {
      targets = [target];
    }

    Object.values(targets).forEach((target) => {
      const formattedEvent = {
        action: [receiver, target, topic].join(NAMESPACE_SEPARATOR),
        payload,
      };
      console.log(`emits to ${target} -> `, formattedEvent);

      const socket = sockets[target as TARGETS];

      if (socket) {
        socket.emit(CHANNEL_NAME, formattedEvent);
      } else {
        console.error(`the socket "${target}" is not registered`);
      }
    });
  };

  function handleNewMessage(event: SocketEvent) {
    console.log("receives <- ", event);

    const { action, payload } = event;
    const [source, target, topic] = action.split(NAMESPACE_SEPARATOR);

    if (target !== receiver) {
      return;
    }

    switch (source) {
      case TARGETS.Dartboard: {
        break;
      }
      case TARGETS.PlayerInput: {
        emit(TARGETS.ThrowManager, topic, payload);
        break;
      }
      case TARGETS.ThrowManager: {
        switch (topic) {
          case "DART_MISS": {
            emit([TARGETS.MainScreen, TARGETS.ThrowManager], topic, payload);
            break;
          }

          case "SIMULATE_DART_LANDED": {
            emit(
              [TARGETS.MainScreen, TARGETS.ThrowManager],
              "DART_LANDED",
              payload
            );
            break;
          }
        }

        break;
      }
      case TARGETS.MainScreen: {
        break;
      }
      case TARGETS.Dartboard: {
        switch (topic) {
          case "CONNECTED": {
            emit(TARGETS.Dartboard, "CONNECTED_ACK", payload);
            break;
          }
          case "DART_LANDED": {
            emit([TARGETS.MainScreen, TARGETS.ThrowManager], topic, payload);
          }
        }
      }
    }
  }

  socket.on(CHANNEL_NAME, handleNewMessage);
});

httpServer.listen(BACKEND_PORT, SERVER_HOST, () => {
  console.log(`Server running on port ${SERVER_HOST}:${BACKEND_PORT}`);
  console.log("CORS_SETTINGS: ", CORS_SETTINGS);
});
