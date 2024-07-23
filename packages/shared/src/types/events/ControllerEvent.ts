import { GenericEvent } from '../events/common'
import { Entity, ClientEntity, Player, Game, DPadDirection, Location } from '../common'

type State = unknown

export type StateEvent = 
  GenericControllerEvent<
    'GET_STATE',
    State
  >

// Event that the Controller is going to RECEIVE/HANDLE
export type GenericControllerEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  ClientEntity,
  Entity.CONTROLLER
>

export type PlayerManagementEvents =
  GenericControllerEvent<
    'ADD_PLAYER',
    Omit<Player, 'id'>
  > | 
  GenericControllerEvent<
    'REMOVE_PLAYER',
    Pick<Player, 'id'>
  >

export type ThrowManagementEvent =
  GenericControllerEvent<
    'MISS_THROW',
    undefined
  > |
  GenericControllerEvent<
    'SIMULATE_THROW',
    Location
  > |
  GenericControllerEvent<
    'CANCEL_LAST_THROW',
    undefined
  >

export type GameSelectionEvent =
  GenericControllerEvent<
    'FOCUS_GAME',
    Game
  > |
  GenericControllerEvent<
    'START_GAME',
    Game
  >

export type RoundEvent = 
  GenericControllerEvent<
    'START_ROUND',
    undefined
  > |
  GenericControllerEvent<
    'FINISH_ROUND',
    undefined
  >

export type DartboardEvent = 
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
    Location
  >

export type PlayerDPadEvent = 
    GenericControllerEvent<
      'DPAD_PRESSED',
      DPadDirection
    >

export type ControllerEvent =
  PlayerManagementEvents |
  StateEvent |
  ThrowManagementEvent |
  GameSelectionEvent |
  RoundEvent |
  DartboardEvent |
  PlayerDPadEvent
