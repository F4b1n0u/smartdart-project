import { Entity } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.SETUP_HANDLER,
  Entity.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.SETUP_HANDLER
>

export type FromSetupManagerEvent = GetStateEvent<Entity.SETUP_HANDLER>
export type ToSetupManagerEvent = NotifyAppStateChangeEvent<Entity.SETUP_HANDLER>
