import { Client, Topic } from './common'

import {
  FromDartBoardEvent,
  FromDPadEvent,
  FromGamesEvent,
  FromPlayersEvent,
  FromRoundEvent,
  FromScoreEvent,
  FromSetupEvent,
  FromThrowEvent,

  StateChangeFromControllerToClient,
  
  ToDartBoardEvent,
  ToDPadEvent,
  ToGamesEvent,
  ToPlayersEvent,
  ToRoundEvent,
  ToScoreEvent,
  ToSetupEvent,
  ToThrowEvent
} from './events'


export type GenericEvent<TAction extends string, TPayload, TSource extends Topic, TTarget extends Topic > = {
  action: TAction;
  payload: TPayload;
  source: TSource;
  target: TTarget;
};

export type ServerToClientEvent =
  StateChangeFromControllerToClient<Client> |
  ToDartBoardEvent |
  ToDPadEvent |
  ToGamesEvent |
  ToPlayersEvent |
  ToRoundEvent |
  ToScoreEvent |
  ToSetupEvent |
  ToThrowEvent 

export type ClientToServerEvents = 
  FromDartBoardEvent |
  FromDPadEvent |
  FromGamesEvent |
  FromPlayersEvent |
  FromRoundEvent |
  FromScoreEvent |
  FromSetupEvent |
  FromThrowEvent |
  StateChangeFromControllerToClient<Client>