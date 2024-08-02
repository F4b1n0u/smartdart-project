import { FromClientEvent } from './events/utils/ClientEvent'

export enum Entity {
  DISPLAY = 'DISPLAY',      // projector
  COMMAND = 'COMMAND',      // tablet
  DARTBOARD = 'DARTBOARD',  // unicorn dartboard
  DPAD = 'DPAD',            // player dpad
  CONTROLLER = 'CONTROLLER' // server
}

export type Emitter = Entity.CONTROLLER | Entity.COMMAND | Entity.DARTBOARD | Entity.DPAD
export type Receiver = Entity.CONTROLLER | Entity.COMMAND | Entity.DISPLAY | Entity.DPAD

export type Client = Entity.COMMAND | Entity.DISPLAY | Entity.DARTBOARD | Entity.DPAD
export type Server = Entity.CONTROLLER

export type ClientEmitter = Client & Emitter
export type ClientReceiver = Client & Receiver

export enum Topic {
  DARTBOARD = 'DARTBOARD',
  GAMES = 'GAMES',
  PLAYERS = 'PLAYERS',
  SETUP = 'SETUP',
  GAME = 'GAME',
  STATE = 'STATE',
}

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
}

export type Player = {
  id: string,
  name: string,
  photo: string
}

export enum GameId {
  GAME_A = 'GAME_A',
  // GAME_B = 'GAME_B',
  // GAME_C = 'GAME_C'
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

export type Round = {
  playingPlayerId: Player['id'],
  throws: Array<Throw>,
  canFinishRound: boolean
}

export type AppState<TGameState = unknown> = {
  // high level status, wil lbe relied on on multiple clients/screens
  status:
    'READY_TO_PLAY' | // mainScreen: display preview of focused game  // controlScreen: display the carrousell
    'SETTING_UP' |    // mainScreen: display setting up helpers       // controlScreen: display setup component
    'PLAYING_GAME'    // mainScreen: display game state               // controlScreen: display Round Manager
  
  selectedGameId: GameId

  // relevant only if status === 'PLAYING_GAME'
  // must be reset if not in this status
  game: TGameState,
  
  // always here and accessible at all time
  players: ReadonlyArray<Player>,
  
  dpad: {
    status: 'ACTIVE' | 'INACTIVE'
  },
}

export type EmitFn<TEmitEvent extends FromClientEvent> = (
  topic: FromClientEvent['topic'],
  action: TEmitEvent['action'],
  payload?: TEmitEvent['payload']
) => void

export type EmitHandlerFn<TEmitEvent extends FromClientEvent> = ({
  topic,
  action,
  payload
}: Pick<TEmitEvent, 'topic' | 'action' | 'payload'>) => () => void