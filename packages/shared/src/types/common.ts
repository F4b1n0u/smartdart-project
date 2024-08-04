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

// when you look at the board,starts from the center and after go up and after go clockwise
export const INDEX_TO_SCORE = [
  25, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
]
export const SCORE_TO_INDEX: Array<number | undefined> = [undefined]
// 0, 21,22,23,24 are not on the board
// undefined, 2,9,11,4,20,6,13,15,18,7,16,19,5,17,8,14,10,3,12,1,undefined, undefined, undefined, undefined, 0
INDEX_TO_SCORE.forEach((score) => {
  SCORE_TO_INDEX[score] = INDEX_TO_SCORE.indexOf(score)
});

export type LocationIndex = 0 | 20 | 1 | 18 | 4 | 13 | 6 | 10 | 15 | 2 | 17 | 3 | 19 | 7 | 16 | 8 | 11 | 14 | 9 | 12 | 5
export type ScoreIndex =   25 | 20 | 1 | 18 | 4 | 13 | 6 | 10 | 15 | 2 | 17 | 3 | 19 | 7 | 16 | 8 | 11 | 14 | 9 | 12 | 5

export type Location =
  { index: 0,  multiplier: Multiplier.SINGLE_SLIM | Multiplier.DOUBLE, score: 25 } |
  { index: 1,  multiplier: Multiplier, score: 20 } |
  { index: 2,  multiplier: Multiplier, score: 1 } |
  { index: 3,  multiplier: Multiplier, score: 18 } |
  { index: 4,  multiplier: Multiplier, score: 4 } |
  { index: 5,  multiplier: Multiplier, score: 13 } |
  { index: 6,  multiplier: Multiplier, score: 6 } |
  { index: 7,  multiplier: Multiplier, score: 10 } |
  { index: 8,  multiplier: Multiplier, score: 15 } |
  { index: 9,  multiplier: Multiplier, score: 2 } |
  { index: 10,  multiplier: Multiplier, score: 17 } |
  { index: 11,  multiplier: Multiplier, score: 3 } |
  { index: 12,  multiplier: Multiplier, score: 19 } |
  { index: 13,  multiplier: Multiplier, score: 7 } |
  { index: 14,  multiplier: Multiplier, score: 16 } |
  { index: 15,  multiplier: Multiplier, score: 8 } |
  { index: 16,  multiplier: Multiplier, score: 11 } |
  { index: 17,  multiplier: Multiplier, score: 14 } |
  { index: 18,  multiplier: Multiplier, score: 9 } |
  { index: 19,  multiplier: Multiplier, score: 12 } |
  { index: 20,  multiplier: Multiplier, score: 5 }

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
    'PLAYING_GAME',    // mainScreen: display game state               // controlScreen: display Round Manager
  
  dartboardConnection: 'MISSING' | 'ESTABLISHED',

  selectedGameId: GameId,

  // relevant only if status === 'PLAYING_GAME'
  // must be reset if not in this status
  game?: TGameState,
  
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