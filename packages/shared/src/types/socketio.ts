import { Socket } from "socket.io";
import { FromClientEvent, ToClientEvent } from './events/utils/ClientEvent'
import { CHANNEL_NAME } from "../../../shared/src/constants";
import { Client } from "../../../shared/src/types/common";

export interface InterServerMessages {
  ping: () => void;
}

export interface ServerToClientMessages {
  noArg: () => void;
  [CHANNEL_NAME]: (event: ToClientEvent) => void;
}

export interface ClientToServerMessages {
  [CHANNEL_NAME]: (event: FromClientEvent) => void;
}

export type SmartdartSocket = Socket<
  ClientToServerMessages,
  ServerToClientMessages,
  InterServerMessages,
  unknown
>

export type Sockets = Partial<Record<Client, SmartdartSocket >>;