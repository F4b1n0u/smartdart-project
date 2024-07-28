import { Topic, GameId } from '../common'
import { FromCommandEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromDefaultGamesEvent =
  FromCommandEvent<
    Topic.GAMES,
    'SELECT_GAME',
    GameId
  > |
  FromCommandEvent<
    Topic.GAMES,
    'START_SELECTED_GAME',
    undefined
  > |
  FromCommandEvent<
    Topic.GAMES,
    'PAUSE_SELECTED_GAME',
    undefined
  >  |
  FromCommandEvent<
    Topic.GAMES,
    'STOP_SELECTED_GAME',
    undefined
  > |
  RequestFullAppStateEvent


export type ToDefaultGamesEvent = NotifyAppStateChangeEvent