import { Location } from '../common'
import { FromDartboardEvent, RequestFullAppStateEvent } from './utils/utils'

export type FromDartBoardEvent = 
  FromDartboardEvent<
    'NOTIFY_CONNECTION_ESTABLISHED', // TODO move this event into the SETUP Topic, and move dartboardConnection state into setup
    undefined
  > |
  FromDartboardEvent<
    'NOTIFY_BUTTON_PRESSED',
    undefined
  > |
  FromDartboardEvent<
    'NOTIFY_THROW_LANDED',
    Location
  > |
  RequestFullAppStateEvent

export type ToDartBoardEvent = never
  
