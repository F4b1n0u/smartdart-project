import { Topic } from '../common'
import { FromCommandEvent, ToCommandEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromRoundEvent = 
  FromCommandEvent<
    Topic.ROUNDS,
    'START_ROUND',
    undefined
  > |
  FromCommandEvent<
    Topic.ROUNDS,
    'FINISH_ROUND',
    undefined
  > |
  RequestFullAppStateEvent

  // Maybe this is not needed at all !
  //could this be driven by the state update instead ???
export type ToRoundEvent =
  ToCommandEvent<
    Topic.ROUNDS,
    'WAIT_TO_START_ROUND',
    undefined
  > |
  NotifyAppStateChangeEvent

