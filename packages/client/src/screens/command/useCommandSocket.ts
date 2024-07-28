import { Entity } from '../../../../shared/src/types/common'
import { FromClientEvent } from '../../../../shared/src/types/events/utils/FromClientEvent'
import { useSocketEmit, useSocketState } from '../../utils/useEntitySocket'

export const useCommandSocketEmit = <
TFromClientEvent extends FromClientEvent,
>() => {
  return useSocketEmit<TFromClientEvent>(Entity.COMMAND)
}

export const useCommandSocketState = <
  TState,
>(path: string, defaultWhileLoading?: TState) => {
  return useSocketState<TState>(Entity.COMMAND, path, defaultWhileLoading)
}