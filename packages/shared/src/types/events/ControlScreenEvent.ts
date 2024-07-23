import { Entity, Player } from '../common'
import { GenericEvent } from './common'

// Event that the Control Screen is going to RECEIVE/HANDLE
type GenericControlScreenEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.CONTROL_SCREEN
>
export type ControlScreenEvent = 
  GenericControlScreenEvent<
    'ASK_START_ROUND',
    Player
  > |
  GenericControlScreenEvent<
    'DISABLE_REMAINING_THROW',
    undefined
  >

  
