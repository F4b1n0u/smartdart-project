import { Topic } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.SETUP_HANDLER,
  Topic.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.SETUP_HANDLER
>

export type FromSetupManagerEvent = GetStateEvent<Topic.SETUP_HANDLER>
export type ToSetupManagerEvent = NotifyAppStateChangeEvent<Topic.SETUP_HANDLER>
