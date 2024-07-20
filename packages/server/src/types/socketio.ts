import { Socket } from "socket.io";
import { Entity, Event } from "@shared/types";

export const CHANNEL_NAME = "SYSTEM";

export type Sockets = Partial<{
  [key in Entity]: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
}>;

export interface ServerToClientEvents {
  noArg: () => void;
  [CHANNEL_NAME]: (event: Event) => void;
}

export interface ClientToServerEvents {
  [CHANNEL_NAME]: (event: any) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
