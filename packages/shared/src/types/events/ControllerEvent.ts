import { GenericEvent } from './utils'
import { Entity, ClientEntity, AppState } from '../common'

export type StateEvent = 
  GenericControllerEvent<
    'GET_STATE',
    ClientEntity,
    AppState
  >

// Event that the Controller is going to RECEIVE/HANDLE
export type GenericControllerEvent<
  TAction extends string,
  TSource extends ClientEntity,
  TPayload
> = GenericEvent<
  TAction,
  TPayload,
  TSource,
  Entity.CONTROLLER
>