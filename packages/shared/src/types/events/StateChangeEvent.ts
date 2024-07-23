import { Entity } from '../common'
import { GenericEvent } from './common'

type GenericStateEvent<TTarget extends Entity> = GenericEvent<
  'NOTIFY_STATE_CHANGE',
  unknown,
  Entity.CONTROLLER,
  TTarget
>
export type StateChangeEvent = 
  GenericStateEvent<
    Entity.CONTROL_SCREEN
  > |
  GenericStateEvent<
    Entity.DARTBOARD
  > |
  GenericStateEvent<
    Entity.DISPLAY_SCREEN
  > |
  GenericStateEvent<
    Entity.DISPLAY_SCREEN
  >
