import { ClientTopic, Topic } from '../common'
import { GenericEvent } from './common'

type StateChangeFromControllerTo<TTarget extends ClientTopic> = GenericEvent<
  'NOTIFY_STATE_CHANGE',
  unknown,
  Topic.CONTROLLER,
  TTarget
>
export type StateChangeFromControllerToClient = 
  StateChangeFromControllerTo<Topic.GAME_SELECTOR> |
  StateChangeFromControllerTo<Topic.PLAYER_INPUT> |
  StateChangeFromControllerTo<Topic.PLAYER_MANAGER> |
  StateChangeFromControllerTo<Topic.ROUND_MANAGER> |
  StateChangeFromControllerTo<Topic.SCORE_BOARD> |
  StateChangeFromControllerTo<Topic.THROW_MANAGER>
