export enum Entity {
  Dartboard = "Dartboard",
  MainScreen = "MainScreen",
  ThrowManager = "ThrowManager",
  PlayerInput = "PlayerInput",
}

export type SocketEvent = { action: string; payload: any };
