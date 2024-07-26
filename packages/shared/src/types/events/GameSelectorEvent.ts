import { Topic, GameId } from '../common'
import { GenericEvent } from './utils'
import { GetStateEvent, NotifyAppStateChangeEvent} from './utils'

type FromEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.GAME_SELECTOR,
  Topic.CONTROLLER
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.GAME_SELECTOR
>

export type FromGameSelectorEvent =
  FromEvent<
    'FOCUS_GAME',
    GameId
  > |
  FromEvent<
    'START_SELECTED_GAME',
    undefined
  > |
  GetStateEvent<Topic.GAME_SELECTOR>


export type ToGameSelectorEvent = NotifyAppStateChangeEvent<Topic.GAME_SELECTOR>