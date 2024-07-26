import { Topic, Location } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.THROW_MANAGER,
  Topic.CONTROLLER
>

type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.THROW_MANAGER
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
  GetStateEvent<Topic.THROW_MANAGER>

export type ToThrowManagerEvent = 
  ToEvent<
    'DISABLE_REMAINING_THROW',
    undefined
  > |
  NotifyAppStateChangeEvent<Topic.THROW_MANAGER>