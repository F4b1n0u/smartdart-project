import { Topic, DPadDirection } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.PLAYER_INPUT,
  Topic.CONTROLLER
>

type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.PLAYER_INPUT
>

export type FromPlayerInputEvent = 
  FromEvent<
    'NOTIFY_D-PAD_PRESSED',
    DPadDirection
  > |
  GetStateEvent<Topic.PLAYER_INPUT>

export type ToPlayerInputEvent = 
  ToEvent<
    'ENABLE',
    undefined
  > |
  ToEvent<
    'DISABLE',
    undefined
  > |
  NotifyAppStateChangeEvent<Topic.PLAYER_INPUT>