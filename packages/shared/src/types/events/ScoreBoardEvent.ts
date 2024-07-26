import { Topic, GameId } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.SCORE_BOARD
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.SCORE_BOARD,
  Topic.CONTROLLER
>

export type FromScoreBoardEvent = 
  FromEvent<
    'PREVIEW_GAME',
    GameId
  > | 
  FromEvent<
    'DISPLAY_GAME',
    GameId
  > |
  GetStateEvent<Topic.SCORE_BOARD>

  export type ToScoreBoardEvent = NotifyAppStateChangeEvent<Topic.SCORE_BOARD>