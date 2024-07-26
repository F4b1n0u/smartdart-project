import { Topic, GameId } from '../common'
import { GenericEvent } from './common'

// Event that the Display Screen is going to RECEIVE/HANDLE
type GenericDisplayScreenEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Topic.CONTROLLER,
  Topic.DISPLAY_SCREEN
>
export type DisplayScreenEvent = 
  GenericDisplayScreenEvent<
    'PREVIEW_GAME',
    GameId
  > | 
  GenericDisplayScreenEvent<
    'DISPLAY_GAME',
    GameId
  >
