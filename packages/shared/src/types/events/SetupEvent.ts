import { PointData } from 'pixi.js';
import { Topic } from '../common'
import { RequestFullAppStateEvent, NotifyAppStateChangeEvent, FromCommandEvent } from './utils/utils'

// TODO need to be implemented

export type FromSetupEvent = RequestFullAppStateEvent |
  FromCommandEvent<
    Topic.SETUP,
    'UPDATE_DARTBOARD_POSITION',
    PointData
  > |
  FromCommandEvent<
    Topic.SETUP,
    'UPDATE_SCREEN_POSITION',
    PointData
  > |
  FromCommandEvent<
    Topic.SETUP,
    'UPDATE_SCREEN_DIMENSION',
    PointData
  > |
  FromCommandEvent<
    Topic.SETUP,
    'UPDATE_SCREEN_SKEW',
    PointData
  >

export type ToSetupEvent = NotifyAppStateChangeEvent
