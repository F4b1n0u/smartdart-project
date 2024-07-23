import { ClientEntity, Entity, AppState } from '../common'

export type GenericEvent<TAction extends string, TPayload, TSource extends Entity, TTarget extends Entity > = {
  action: TAction;
  payload: TPayload;
  source: TSource;
  target: TTarget;
};

export type GetStateEvent<TSource extends ClientEntity> =   
  GenericEvent<
    'GET_FULL_APP_STATE',
    AppState,
    TSource,
    Entity.CONTROLLER
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

export type NotifyAppStateChangeEvent<TTarget extends ClientEntity> =
  GenericEvent<
    'NOTIFY_STATE_CHANGE',
    AppState,
    Entity.CONTROLLER,
    TTarget
  >