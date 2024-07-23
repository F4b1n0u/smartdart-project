import { useEffect, useState } from 'react'
import { useSocket } from "./useSocket"
import { AppState, ClientEntity, Entity } from "../../shared/src/types/common"
import { get } from 'lodash';
import { GetStateEvent, NotifyAppStateChangeEvent } from '../../shared/src/types/events/utils';

type ValuesOf<T> = T[keyof T];

export const useSocketState = <
  TEntity extends ClientEntity,
  TState extends ValuesOf<AppState>,  
>(entity: TEntity, path: string) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [state, setState] = useState<TState>()

  const { emit } = useSocket<
    GetStateEvent<ClientEntity>,
    // TODO check why the following does not work
    // NotifyAppStateChangeEvent<TEntity>
    NotifyAppStateChangeEvent<Entity.DARTBOARD>
  >({
    entity,
    onEvent: ({ action, payload }) => {
      if (action === 'NOTIFY_STATE_CHANGE') {
        setState(get(payload, path))
        setIsLoaded(true)
      }
    }
  })

  useEffect(() => {
    emit('GET_FULL_APP_STATE')
  }, [emit])

  return {
    state,
    isLoaded
  }
}
