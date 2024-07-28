import { Location } from '../common'
import { FromDartboardEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromDartBoardEvent = 
  FromDartboardEvent<
    'NOTIFY_CONNECTION_ESTABLISHED',
    undefined
  > |
  FromDartboardEvent<
    'NOTIFY_BUTTON_PRESSED',
    undefined
  > |
  FromDartboardEvent<
    'REGISTER_THROW',
    Location
  > |
  RequestFullAppStateEvent

export type ToDartBoardEvent = NotifyAppStateChangeEvent
  
