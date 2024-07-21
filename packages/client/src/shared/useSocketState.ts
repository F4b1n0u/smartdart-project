import { useCallback, useState } from 'react'
import { useSocket } from "../useSocket"
import { Entity } from "../../../shared/src/types"
import { get } from 'lodash';

export const useSocketState = <TState extends any>(entity: Entity, path = '') => {
  const [state, setState] = useState<TState>()
  const { emit } = useSocket(entity, ({ action, payload }) => {
    const [, , topic] = action.split(':')
    if (topic === 'STATE_UPDATE') {
      setState(get(payload, path))
    }
  })

  const update = useCallback((value: any)  => {
    emit('UPDATE_STATE', {
      path,
      value,
    })
  }, [emit, path])

  return {
    state,
    update
  }
}
