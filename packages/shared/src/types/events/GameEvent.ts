import { DPadDirection, Topic } from '../common'
import { RequestFullAppStateEvent, NotifyAppStateChangeEvent, FromCommandEvent, FromDPadEvent, ToDPadEvent, ToClient } from './utils/utils'

export type FromGameEvent = RequestFullAppStateEvent |
  FromCommandEvent<
    Topic.GAME,
    'UPDATE_GAME_STATE',
    unknown
  > |
  FromCommandEvent<
    Topic.GAME,
    'START_ROUND',
    undefined
  > |
  FromCommandEvent<
    Topic.GAME,
    'FINISH_ROUND',
    undefined
  > |
  FromDPadEvent<
    Topic.GAME,
    'NOTIFY_D-PAD_PRESSED',
    DPadDirection
  > |
  FromCommandEvent<
    Topic.GAME,
    'MISS_THROW',
    undefined
  > |
  FromCommandEvent<
    Topic.GAME,
    'SIMULATE_THROW',
    Location
  > |
  FromCommandEvent<
    Topic.GAME,
    'CANCEL_LAST_THROW',
    undefined
  >

export type ToGameEvent = NotifyAppStateChangeEvent |
  ToClient<
    Topic.GAME,
    'INITIALIZE',
    undefined
  > |
  ToDPadEvent<
    Topic.GAME,
    'ENABLE_DPAD',
    undefined
  > |
  ToDPadEvent<
    Topic.GAME,
    'DISABLE_DPAD',
    undefined
  >
