export enum Entity {
  DARTBOARD = "DARTBOARD",
  DISPLAY_SCREEN = "DISPLAY_SCREEN",
  CONTROL_SCREEN = "CONTROL_SCREEN",
  PLAYER_INPUT = "PLAYER_INPUT",
  CONTROLLER = "CONTROLLER"
}

export type ClientEntity = Entity.DISPLAY_SCREEN | Entity.CONTROL_SCREEN | Entity.PLAYER_INPUT | Entity.DARTBOARD

export enum Multiplier {
  SINGLE_SLIM = 'SINGLE_SLIM',
  SINGLE_FAT = 'SINGLE_FAT',
  DOUBLE = 'DOUBLE',
  TRIPLE = 'TRIPLE',
}

export type Location = {
  score: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 25,
  multiplier: Multiplier
}

export type Throw = {
  location?: Location
  // TODO add a getter ??
  // could rely on location presence, to avoid redundancy
  hasLanded: boolean
}

export type Player = {
  id: string,
  name: string,
  photo: string
}

export enum Game {
  GAME_A = 'GAME_A'
}

export enum DPadDirection {
  UP = 'UP',
  UP_LEFT = 'UP_LEFT',
  LEFT = 'LEFT',
  LEFT_DOWN = 'LEFT_DOWN',
  DOWN = 'DOWN',
  DOWN_RIGHT = 'DOWN_RIGHT',
  RIGHT = 'RIGHT',
  RIGHT_UP = 'RIGHT_UP', 
}

export type AppState = {
  // high level status, wil lbe relied on on multiple clients/screens
  app: {
    status:
      'READY_TO_PLAY' | // mainScreen: display preview of focused game  // controlScreen: display the carrousell
      'SETTING_UP' |    // mainScreen: display setting up helpers       // controlScreen: display setup component
      'PLAYING_GAME'    // mainScreen: display game state               // controlScreen: display Round Manager
  },
  
  // relevant only if app.status === 'PLAYING_GAME'
  // must be reset if not in this status
  game: unknown,
  
  // always here and accessisble at all time
  players: ReadonlyArray<Player>,
  
  // relevant only if app.status === 'PLAYING_GAME'
  // must be reset if not in this status
  throwManager: {
    currentPlayerId?: Player,
    throwsByPlayerId: Record<Player['id'], Array<Throw>>
  },

  dpad: {
    status: 'ACTIVE' | 'INACTIVE'
  },
}