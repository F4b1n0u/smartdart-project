import { Entity } from '../../../../shared/src/types/common'
import { FromClientEvent } from '../../../../shared/src/types/events/utils/ClientEvent'
import { useSocketEmit, useSocketState } from '../../../../shared/src/useEntitySocket'

export const useCommandSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>(
  onEvent = () => {}
) => {
  return useSocketEmit<TFromClientEvent>({ entity: Entity.COMMAND, onEvent })
}

export const useCommandSocketState = <
  TState,
>(path: string, defaultWhileLoading?: TState) => {
  return useSocketState<TState>(Entity.COMMAND, path, defaultWhileLoading)
}