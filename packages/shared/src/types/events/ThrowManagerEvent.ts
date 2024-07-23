import { Entity, Location } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.THROW_MANAGER,
  Entity.CONTROLLER
>

type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.THROW_MANAGER
>

export type FromThrowManagerEvent = 
  FromEvent<
    'MISS_THROW',
    undefined
  > |
  FromEvent<
    'SIMULATE_THROW',
    Location
  > |
  FromEvent<
    'CANCEL_LAST_THROW',
    undefined
  > |
  GetStateEvent<Entity.THROW_MANAGER>

export type ToThrowManagerEvent = 
  ToEvent<
    'DISABLE_REMAINING_THROW',
    undefined
  > |
  NotifyAppStateChangeEvent<Entity.THROW_MANAGER>