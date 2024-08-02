import { Entity } from '@shared/types/common'
import { useEntitySocketState } from '@shared/components/useEntitySocket'

export const useDisplaySocketState = <
  TState,
>(path: string) => {
  return useEntitySocketState<TState>(Entity.DISPLAY, path)
}