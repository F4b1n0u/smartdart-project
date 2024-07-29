import { Client, ClientEmitter, ClientReceiver, Entity, Topic } from './common'

import {
  FromDartBoardEvent,
  FromDPadEvent,
  FromPlayersEvent,
  FromRoundEvent,
  FromScoreEvent,
  FromSetupEvent,
  FromThrowEvent,

  StateChangeFromControllerToClient,
  
  ToDartBoardEvent,
  ToDPadEvent,
  ToPlayersEvent,
  ToRoundEvent,
  ToScoreEvent,
  ToSetupEvent,
  ToThrowEvent
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
  ToDPadEvent |
  ToPlayersEvent |
  ToRoundEvent |
  ToScoreEvent |
  ToSetupEvent |
  ToThrowEvent 

export type ClientToServerEvents = 
  FromDartBoardEvent |
  FromDPadEvent |
  FromPlayersEvent |
  FromRoundEvent |
  FromScoreEvent |
  FromSetupEvent |
  FromThrowEvent