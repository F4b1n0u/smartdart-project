import { ClientReceiver, Entity, Topic } from './common'

import {
  FromDartBoardEvent,
  FromGameEvent,
  FromPlayersEvent,
  FromSetupEvent,
  StateChangeFromControllerToClient,
  ToDartBoardEvent,
  ToGameEvent,
  ToPlayersEvent,
  ToSetupEvent
} from './events'


export type GenericEvent<
  TTopic extends Topic,
  TAction extends string,
  TPayload,
  TSource extends Entity,
  TTarget extends Entity
> = {
  topic: TTopic,
  action: TAction;
  payload: TPayload;
  source: TSource;
  target: TTarget;
};

export type ServerToClientEvent =
  StateChangeFromControllerToClient<ClientReceiver> |
  ToDartBoardEvent |
  ToPlayersEvent |
  ToSetupEvent |
  ToGameEvent

export type ClientToServerEvents = 
  FromDartBoardEvent |
  FromPlayersEvent |
  FromSetupEvent |
  FromGameEvent
  