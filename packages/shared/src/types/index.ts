export enum Entity {
  DARTBOARD = "DARTBOARD",
  DISPLAY_SCREEN = "DISPLAY_SCREEN",
  CONTROL_SCREEN = "CONTROL_SCREEN",
  PLAYER_INPUT = "PLAYER_INPUT",
}

export type Event = { action: string; payload: any };

export enum Multiplier {
  SINGLE_SLIM = 'SINGLE_SLIM',
  SINGLE_FAT = 'SINGLE_FAT',
  DOUBLE = 'DOUBLE',
  TRIPLE = 'TRIPLE',
}

export type Dart = {
  score: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 25,
  multiplier: Multiplier
}

export type Hit = Dart

export type Player = {
  id: number,
  name: string,
  photo: string
}