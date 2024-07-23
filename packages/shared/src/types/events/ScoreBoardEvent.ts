import { Entity, Game } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.SCORE_BOARD
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.SCORE_BOARD,
  Entity.CONTROLLER
>

export type FromScoreBoardEvent = 
  FromEvent<
    'PREVIEW_GAME',
    Game
  > | 
  FromEvent<
    'DISPLAY_GAME',
    Game
  > |
  GetStateEvent<Entity.SCORE_BOARD>

  export type ToScoreBoardEvent = NotifyAppStateChangeEvent<Entity.SCORE_BOARD>