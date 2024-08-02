import { Entity } from '@shared/types/common'
import { FromClientEvent } from '@shared/types/events/utils/ClientEvent'
import { useEntitySocketEmit, useEntitySocketState } from '@shared/components/useEntitySocket'

export const useDPadSocketEmit = <
TFromClientEvent extends FromClientEvent,
>() => {
  return useEntitySocketEmit<TFromClientEvent>(Entity.DPAD)
}

export const useDPadSocketState = <
  TState,
>(path: string) => {
  return useEntitySocketState<TState>(Entity.DPAD, path)
}