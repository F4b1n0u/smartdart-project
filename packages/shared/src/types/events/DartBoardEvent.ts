import { Topic, Location } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.DARTBOARD,
  Topic.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,

  Topic.CONTROLLER,
  Topic.DARTBOARD
>

export type FromDartBoardEvent = 
  FromEvent<
    'NOTIFY_CONNECTION_ESTABLISHED',
    undefined
  > |
  FromEvent<
    'NOTIFY_BUTTON_PRESSED',
    undefined
  > |
  FromEvent<
    'REGISTER_THROW',
    Location
  > |
  GetStateEvent<Topic.DARTBOARD>

export type ToDartBoardEvent = NotifyAppStateChangeEvent<Topic.DARTBOARD>
  
