export enum Topic {
  // physical unicorn dartboard
  DARTBOARD = "DARTBOARD",

  // projection on the wall
  SCORE_BOARD = "SCORE_BOARD",
  
  // tablet close the the player
  GAME_SELECTOR = "GAME_SELECTOR",
  PLAYER_MANAGER = "PLAYER_MANAGER",
  ROUND_MANAGER = "ROUND_MANAGER",
  THROW_MANAGER = "THROW_MANAGER",
  SETUP_HANDLER = "SETUP_HANDLER",
  
  // dedicated mobile per player
  PLAYER_INPUT = "PLAYER_INPUT",

  // server receiving/emitting from/to clients
  CONTROLLER = "CONTROLLER"
}

export type ClientTopic =
  Topic.SCORE_BOARD |
  Topic.PLAYER_MANAGER |
  Topic.GAME_SELECTOR |
  Topic.ROUND_MANAGER |
  Topic.THROW_MANAGER |
  Topic.SETUP_HANDLER |
  Topic.PLAYER_INPUT |
  Topic.DARTBOARD

export const CLIENT_TOPICS: Array<ClientTopic> = [
  Topic.SCORE_BOARD,
  Topic.PLAYER_MANAGER,
  Topic.GAME_SELECTOR,
  Topic.ROUND_MANAGER,
  Topic.THROW_MANAGER,
  Topic.SETUP_HANDLER,
  Topic.PLAYER_INPUT,
  Topic.DARTBOARD
]
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

export enum GameId {
  GAME_A = 'GAME_A',
  GAME_B = 'GAME_B',
  GAME_C = 'GAME_C'
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
  status:
    'READY_TO_PLAY' | // mainScreen: display preview of focused game  // controlScreen: display the carrousell
    'SETTING_UP' |    // mainScreen: display setting up helpers       // controlScreen: display setup component
    'PLAYING_GAME'    // mainScreen: display game state               // controlScreen: display Round Manager
  
  selectedGameId: GameId

  // relevant only if app.status === 'PLAYING_GAME'
  // must be reset if not in this status
  game: unknown,
  
  // always here and accessible at all time
  players: ReadonlyArray<Player>,
  
  dpad: {
    status: 'ACTIVE' | 'INACTIVE'
  },
}