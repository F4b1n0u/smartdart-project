import { Entity } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.ROUND_MANAGER,
  Entity.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.ROUND_MANAGER
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
  GetStateEvent<Entity.ROUND_MANAGER>

export type ToRoundManagerEvent =
  ToEvent<
    'WAIT_TO_START_ROUND',
    undefined
  > |
  NotifyAppStateChangeEvent<Entity.ROUND_MANAGER>

