import { Socket } from "socket.io";
import { Entity } from "../../../shared/src/types/common";
import { ServerToClientEvent, ClientToServerEvents } from '../../../shared/src/types/event'
import { CHANNEL_NAME } from "../../../shared/src/constants";

export type SmartdartSocket = Socket<
  ClientToServerMessages,
  ServerToClientMessages,
  InterServerMessages,
  SocketData
>

export type Sockets = Partial<Record<Entity, SmartdartSocket >>;

export interface ServerToClientMessages {
  noArg: () => void;
  [CHANNEL_NAME]: (event: ServerToClientEvent) => void;
}

export interface ClientToServerMessages {
  [CHANNEL_NAME]: (event: ClientToServerEvents) => void;
}

export interface InterServerMessages {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
