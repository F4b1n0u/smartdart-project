import { Socket } from "socket.io";
import { FromClientEvent } from './events/FromClientEvent'
import { ToClientEvent } from './events/ToClientEvent'
import { CHANNEL_NAME } from "../../../shared/src/constants";

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

import { Topic } from "../../../shared/src/types/common";

export type SmartdartSocket = Socket<
  ClientToServerMessages,
  ServerToClientMessages,
  InterServerMessages,
  unknown
>

export type Sockets = Partial<Record<Topic, SmartdartSocket >>;