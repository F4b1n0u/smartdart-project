import { Entity } from '../../../../shared/src/types/common'
import { FromClientEvent } from '../../../../shared/src/types/events/utils/FromClientEvent'
import { useSocketEmit, useSocketState } from '../../utils/useEntitySocket'

export const useDPadSocketEmit = <
TFromClientEvent extends FromClientEvent,
>() => {
  return useSocketEmit<TFromClientEvent>(Entity.DPAD)
}

export const useDPadSocketState = <
  TState,
>(path: string) => {
  return useSocketState<TState>(Entity.DPAD, path)
}