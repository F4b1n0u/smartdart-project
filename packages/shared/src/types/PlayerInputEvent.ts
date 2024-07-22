import { Entity } from './common'
import { GenericEvent } from './event'

// Event that the Display Screen is going to RECEIVE/HANDLE
type GenericPlayerInputEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.PLAYER_INPUT
>
export type PlayerInputEvent = 
  GenericPlayerInputEvent<
    'DISABLE_CONTROLLER',
    undefined
  > |
  GenericPlayerInputEvent<
    'ENABLE_CONTROLLER',
    undefined
  >