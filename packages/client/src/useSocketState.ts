import { useCallback, useState, useEffect } from 'react'
import { useSocket } from "./useSocket"
import { Entity } from "../../shared/src/types/common"
import { get } from 'lodash';
import { ClientToServerEvents } from '../../shared/src/types/event';

export const useSocketState = <TState extends any, TEvents extends ClientToServerEvents>(entity: Entity, path = '') => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [state, setState] = useState<TState>()

  const { emit } = useSocket<ClientToServerEvents>(
    entity,
    ({ action, payload }) => {
      if (action === 'NOTIFY_STATE_CHANGE') {
        setState(get(payload, path))
        setIsLoaded(true)
      }
    }
  )

  useEffect(() => {
    emit('GET_STATE')
  }, [emit])

  // Nice to have to speed up dev BUT
  // this open the door of
  //  - how to update the state
  // - -what does the state can be like on the client side
  // and this is a server concern ! so avoid to use this !!!
  // rely on emit and a specific action rather than a generic UPDATE_STATE
  const update = useCallback((value: any)  => {
    emit('UPDATE_STATE', {
      path,
      value,
    })
  }, [emit, path])

  return {
    state,
    isLoaded,
    emit,
    __update__: update
  }
}
