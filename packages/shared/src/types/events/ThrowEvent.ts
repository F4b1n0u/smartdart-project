import { Topic, Location } from '../common'
import { FromCommandEvent, ToCommandEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromThrowEvent = 
  FromCommandEvent<
    Topic.THROWS,
    'MISS_THROW',
    undefined
  > |
  FromCommandEvent<
    Topic.THROWS,
    'SIMULATE_THROW',
    Location
  > |
  FromCommandEvent<
    Topic.THROWS,
    'CANCEL_LAST_THROW',
    undefined
  > |
  RequestFullAppStateEvent

export type ToThrowEvent = 
  ToCommandEvent<
    Topic.THROWS,
    'DISABLE_REMAINING_THROW',
    undefined
  > |
  NotifyAppStateChangeEvent