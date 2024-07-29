import { Entity } from '../../../../shared/src/types/common'
import { useSocketState } from '../../../../shared/src/useEntitySocket'

export const useDisplaySocketState = <
  TState,
>(path: string) => {
  return useSocketState<TState>(Entity.DISPLAY, path)
}