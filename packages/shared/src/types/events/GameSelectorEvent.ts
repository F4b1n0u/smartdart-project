import { Entity, Game } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.GAME_SELECTOR,
  Entity.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.GAME_SELECTOR
>

export type FromGameSelectorEvent =
  FromEvent<
    'FOCUS_GAME',
    Game
  > |
  FromEvent<
    'START_GAME',
    Game
  > |
  GetStateEvent<Entity.GAME_SELECTOR>


export type ToGameSelectorEvent = NotifyAppStateChangeEvent<Entity.GAME_SELECTOR>