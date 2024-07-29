import { Topic, AppState, Entity, Emitter, Receiver, ClientReceiver } from '../../common'
import { FromClientEvent } from './ClientEvent';

type GenericEvent<
  TTopic extends Topic,
  TAction extends string,
  TPayload,
  
  TSource extends Emitter,
  TTarget extends Receiver
> = {
  topic: TTopic;
  action: TAction;
  payload: TPayload;
  
  source: TSource;
  target: TTarget;
};

export type FromControllerEvent<
  TEntity extends ClientReceiver,
  TTopic extends Topic,
  TAction extends string,
  TPayload,
> = GenericEvent<
  TTopic,
  TAction,
  TPayload,
  
  Entity.CONTROLLER,
  TEntity
>

export type FromCommandEvent<
  TTopic extends Topic,
  TAction extends string,
  TPayload,
> = GenericEvent<
  TTopic,
  TAction,
  TPayload,
  
  Entity.COMMAND,
  Entity.CONTROLLER  
>

export type ToCommandEvent<
  TTopic extends Topic,
  TAction extends string,
  TPayload,
> = GenericEvent<
  TTopic,
  TAction,
  TPayload,
  
  Entity.CONTROLLER,
  Entity.COMMAND
>

export type FromDartboardEvent<
  TAction extends string,
  TPayload,
> = GenericEvent<
  Topic.DARTBOARD,
  TAction,
  TPayload,
  
  Entity.DARTBOARD,
  Entity.CONTROLLER  
>

export type ToDisplayEvent<
  TTopic extends Topic,
  TAction extends string,
  TPayload,
> = GenericEvent<
  TTopic,
  TAction,
  TPayload,
  
  Entity.CONTROLLER,
  Entity.DISPLAY
>

export type RequestFullAppStateEvent =   
  GenericEvent<
    Topic.STATE,
    'REQUEST_FULL_APP_STATE',
    undefined,
    
    Emitter,
    Entity.CONTROLLER
  >

type Notification = {
  state: AppState,
  lastEvent: FromClientEvent
}
export type NotifyAppStateChangeEvent =
  GenericEvent<
    Topic.STATE,
    'NOTIFY_STATE_CHANGE',
    Notification,
    
    Entity.CONTROLLER,
    Receiver
  >
