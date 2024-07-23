import { Entity } from './common'

import { ControlScreenEvent } from './ControlScreenEvent'
import { DisplayScreenEvent } from './DisplayScreenEvent'
import { PlayerInputEvent } from './PlayerInputEvent'
import { StateChangeEvent } from './StateChangeEvent'

import { ControllerEvent } from './ControllerEvent'

export type GenericEvent<TAction extends string, TPayload, TSource extends Entity, TTarget extends Entity > = {
  action: TAction;
  payload: TPayload;
  source: TSource;
  target: TTarget;
};

export type ServerToClientEvent =
  ControlScreenEvent |
  DisplayScreenEvent |
  PlayerInputEvent |
  StateChangeEvent

export type ClientToServerEvents = ControllerEvent