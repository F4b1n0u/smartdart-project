
import { Entity } from '../../../shared/src/types/common'
import { useSocketState as useState } from '../useSocketState'

export const useSocketState = () => {
  return useState(Entity.CONTROLLER, 'control')
}