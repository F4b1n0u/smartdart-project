import { Entity, DPadDirection } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.PLAYER_INPUT,
  Entity.CONTROLLER
>

type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.PLAYER_INPUT
>

export type FromPlayerInputEvent = 
  FromEvent<
    'NOTIFY_D-PAD_PRESSED',
    DPadDirection
  > |
  GetStateEvent<Entity.PLAYER_INPUT>

export type ToPlayerInputEvent = 
  ToEvent<
    'ENABLE',
    undefined
  > |
  ToEvent<
    'DISABLE',
    undefined
  > |
  NotifyAppStateChangeEvent<Entity.PLAYER_INPUT>