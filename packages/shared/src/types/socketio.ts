import { Socket } from "socket.io";
import { ServerToClientEvent, ClientToServerEvents } from './events/utils'
import { CHANNEL_NAME } from "../../../shared/src/constants";

export interface InterServerMessages {
  ping: () => void;
}

export interface ServerToClientMessages {
  noArg: () => void;
  [CHANNEL_NAME]: (event: ServerToClientEvent) => void;
}

export interface ClientToServerMessages {
  [CHANNEL_NAME]: (event: ClientToServerEvents) => void;
}

import { Entity } from "../../../shared/src/types/common";

export type SmartdartSocket = Socket<
  ClientToServerMessages,
  ServerToClientMessages,
  InterServerMessages,
  unknown
>

export type Sockets = Partial<Record<Entity, SmartdartSocket >>;