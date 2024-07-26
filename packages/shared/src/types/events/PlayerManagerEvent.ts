import { Topic, Player } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.PLAYER_MANAGER,
  Topic.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.PLAYER_MANAGER
>

export type FromPlayerManagerEvent = 
  FromEvent<
    'ADD_PLAYER',
    Omit<Player, 'id'>
  > | 
  FromEvent<
    'REMOVE_PLAYER',
    Pick<Player, 'id'>
  > |
  GetStateEvent<Topic.PLAYER_MANAGER>

export type ToPlayerManagerEvent = NotifyAppStateChangeEvent<Topic.PLAYER_MANAGER>
  
