import { Topic, DPadDirection } from '../common'
import { FromCommandEvent, ToCommandEvent, RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './utils/utils'

export type FromDPadEvent = 
  FromCommandEvent<
    Topic.D_PAD,
    'NOTIFY_D-PAD_PRESSED',
    DPadDirection
  > |
  RequestFullAppStateEvent

export type ToDPadEvent = 
  ToCommandEvent<
    Topic.D_PAD,
    'ENABLE',
    undefined
  > |
  ToCommandEvent<
    Topic.D_PAD,
    'DISABLE',
    undefined
  > |
  NotifyAppStateChangeEvent