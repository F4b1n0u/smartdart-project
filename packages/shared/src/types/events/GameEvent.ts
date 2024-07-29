import { Topic } from '../common'
import { RequestFullAppStateEvent, NotifyAppStateChangeEvent, FromCommandEvent } from './utils/utils'

export type FromGameEvent = RequestFullAppStateEvent
  | FromCommandEvent<
    Topic.GAME,
    'UPDATE_GAME_STATE',
    unknown
  >

export type ToGameEvent = NotifyAppStateChangeEvent
  | FromCommandEvent<
    Topic.GAME,
    'INITIALIZE',
    undefined
  >