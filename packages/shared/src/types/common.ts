export enum Entity {
  DARTBOARD = "DARTBOARD",
  DISPLAY_SCREEN = "DISPLAY_SCREEN",
  CONTROL_SCREEN = "CONTROL_SCREEN",
  PLAYER_INPUT = "PLAYER_INPUT",
  CONTROLLER = "CONTROLLER"
}

export type ClientEntity = Entity.DISPLAY_SCREEN | Entity.CONTROL_SCREEN | Entity.PLAYER_INPUT

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

export type Throw = Dart

export type Player = {
  id: string,
  name: string,
  photo: string
}

export enum Game {
  GAME_A = 'GAME_A'
}