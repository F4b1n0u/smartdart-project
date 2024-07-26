import { Topic } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.ROUND_MANAGER,
  Topic.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.ROUND_MANAGER
>

export type FromRoundManagerEvent = 
  FromEvent<
    'START_ROUND',
    undefined
  > |
  FromEvent<
    'FINISH_ROUND',
    undefined
  > |
  GetStateEvent<Topic.ROUND_MANAGER>

export type ToRoundManagerEvent =
  ToEvent<
    'WAIT_TO_START_ROUND',
    undefined
  > |
  NotifyAppStateChangeEvent<Topic.ROUND_MANAGER>

