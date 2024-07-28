import { Client, Topic } from '../common'
import { FromControllerEvent } from './utils/utils'

type StateChangeFromControllerTo<
  TEntity extends Client,
  TTopic extends Topic
> = FromControllerEvent<
  TEntity,
  TTopic,
  'NOTIFY_STATE_CHANGE',
  unknown
>
export type StateChangeFromControllerToClient<TEntity extends Client> = 
  StateChangeFromControllerTo<TEntity, Topic.GAMES> |
  StateChangeFromControllerTo<TEntity, Topic.D_PAD> |
  StateChangeFromControllerTo<TEntity, Topic.PLAYERS> |
  StateChangeFromControllerTo<TEntity, Topic.ROUNDS> |
  StateChangeFromControllerTo<TEntity, Topic.SCORE> |
  StateChangeFromControllerTo<TEntity, Topic.DARTBOARD>
