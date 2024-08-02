import { AppState, ClientReceiver, Topic } from '../common'
import { FromClientEvent } from './utils/ClientEvent'
import { FromControllerEvent } from './utils/utils'

type StateChangeFromControllerTo<
  TEntity extends ClientReceiver,
  TTopic extends Topic
> = FromControllerEvent<
  TEntity,
  TTopic,
  'SEND_LAST_APP_STATE',
  {
    state: AppState,
    lastEvent: FromClientEvent
  }
>
export type StateChangeFromControllerToClient<TEntity extends ClientReceiver> = 
  StateChangeFromControllerTo<TEntity, Topic.STATE>
