import { Topic, GameId } from '../common'
import { FromCommandEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromGamesEvent =
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
  RequestFullAppStateEvent


export type ToGamesEvent = NotifyAppStateChangeEvent