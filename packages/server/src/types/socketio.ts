export const CHANNEL_NAME = "SYSTEM";

export type SocketEvent = { action: string; payload: any };

export interface ServerToClientEvents {
  noArg: () => void;
  [CHANNEL_NAME]: (event: SocketEvent) => void;
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
