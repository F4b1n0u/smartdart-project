import { ClientTopic, Topic, AppState } from '../common'

export type GenericEvent<TAction extends string, TPayload, TSource extends Topic, TTarget extends Topic > = {
  action: TAction;
  payload: TPayload;
  source: TSource;
  target: TTarget;
};

export type GetStateEvent<TSource extends ClientTopic> =   
  GenericEvent<
    'REQUEST_FULL_APP_STATE',
    AppState,
    TSource,
    Topic.CONTROLLER
  >
  // | GenericEvent<
  //   '__UPDATE_STATE__',
  //   {
  //     path: string,
  //     value: unknown
  //   },
  //   TSource,
  //   Entity.CONTROLLER
  // >

export type NotifyAppStateChangeEvent<TTarget extends ClientTopic> =
  GenericEvent<
    'NOTIFY_STATE_CHANGE',
    AppState,
    Topic.CONTROLLER,
    TTarget
  >
  
export type StateEvent = 
  GenericEvent<
    'GET_STATE',
    AppState,
    ClientTopic,
    Topic.CONTROLLER
  >