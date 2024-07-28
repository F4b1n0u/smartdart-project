import { Entity } from '../../../shared/src/types/common'
import { FromClientEvent } from '../../../shared/src/types/events/utils/FromClientEvent'
import { useSocketEmit } from '../utils/useEntitySocket'

export const useDartboardSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>() => {
  return useSocketEmit<TFromClientEvent>(Entity.DARTBOARD)
}