import { Entity, Player } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.PLAYER_MANAGER,
  Entity.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.PLAYER_MANAGER
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
  GetStateEvent<Entity.PLAYER_MANAGER>

export type ToPlayerManagerEvent = NotifyAppStateChangeEvent<Entity.PLAYER_MANAGER>
  
