import { Entity } from '@shared/types/common'
import { FromClientEvent } from '@shared/types/events/utils/ClientEvent'
import { useEntitySocketEmit } from '@shared/components/useEntitySocket'

export const useDartboardSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>() => {
  return useEntitySocketEmit<TFromClientEvent>(Entity.DARTBOARD)
}