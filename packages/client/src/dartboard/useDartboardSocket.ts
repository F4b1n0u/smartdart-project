import { Entity } from '../../../shared/src/types/common'
import { FromClientEvent } from '../../../shared/src/types/events/utils/ClientEvent'
import { useSocketEmit } from '../../../shared/src/useEntitySocket'

export const useDartboardSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>() => {
  return useSocketEmit<TFromClientEvent>(Entity.DARTBOARD)
}