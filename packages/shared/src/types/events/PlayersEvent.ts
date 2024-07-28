import { Topic, Player } from '../common'
import { FromCommandEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromPlayersEvent = 
  FromCommandEvent<
    Topic.PLAYERS,
    'ADD_PLAYER',
    Omit<Player, 'id'>
  > | 
  FromCommandEvent<
    Topic.PLAYERS,
    'REMOVE_PLAYER',
    Pick<Player, 'id'>
  > |
  RequestFullAppStateEvent

export type ToPlayersEvent = NotifyAppStateChangeEvent
  
