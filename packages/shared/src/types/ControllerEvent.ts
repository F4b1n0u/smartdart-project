import { Entity } from './common'
import { GenericEvent } from './event'
import { Player, Throw } from './common'

type State = unknown

type StateEvent = 
  GenericControllerEvent<
    '__UPDATE_STATE__',
    {
      path: string,
      value: unknown
    }
  > |
  GenericControllerEvent<
    'GET_STATE',
    State
  >

// Event that the Controller is going to RECEIVE/HANDLE
type GenericControllerEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  ClientEntity,
  Entity.CONTROLLER
>

type PlayerManagementEvents =
  GenericControllerEvent<
    'ADD_PLAYER',
    Omit<Player, 'id'>
  > | 
  GenericControllerEvent<
    'REMOVE_PLAYER',
    Pick<Player, 'id'>
  >

type ThrowManagementEvent =
  GenericControllerEvent<
    'MISS_THROW',
    undefined
  > |
  GenericControllerEvent<
    'SIMULATE_THROW',
    Throw
  > |
  GenericControllerEvent<
    'CANCEL_LAST_THROW',
    Throw
  >

type RoundEvent = 
  GenericControllerEvent<
    'START_ROUND',
    undefined
  > |
  GenericControllerEvent<
    'FINISH_ROUND',
    undefined
  >

type DartboardEvent = 
  GenericControllerEvent<
    'CONNECTION_ACK',
    undefined
  > |
  GenericControllerEvent<
    'BUTTON_PRESSED',
    undefined
  > |
  GenericControllerEvent<
    'REGISTER_THROW',
    Throw
  >

export type ControllerEvent = PlayerManagementEvents | StateEvent | ThrowManagementEvent | RoundEvent | DartboardEvent
