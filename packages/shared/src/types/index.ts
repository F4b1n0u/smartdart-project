export enum Entity {
  Dartboard = "Dartboard",
  DisplayScreen = "DisplayScreen",
  ControlScreen = "ControlScreen",
  PlayerInput = "PlayerInput",
}

export type Event = { action: string; payload: any };
