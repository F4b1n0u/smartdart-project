
import { get } from 'lodash'
import { EmitHandlerFn, EmitFn } from './useEntitySocket'
import { createContext, useContext } from 'react'
import { AppState } from '@shared/types/common'
import { FromClientEvent } from '@shared/types/events/utils/ClientEvent'

const blankEmit = () => console.log('StateContext as not been initialized yet')

export type AppStateContextType<TGameState> = {
  isLoaded: boolean,
  appState: AppState<TGameState> | undefined,
  emit: EmitFn<FromClientEvent>
  emitHandler: EmitHandlerFn<FromClientEvent>
}
export const AppStateContext = createContext<AppStateContextType<unknown>>({
  isLoaded: false,
  appState: undefined,
  emit: blankEmit,
  emitHandler: () => blankEmit
})

export const useAppStateContext = <TState>(path?: string, defaultWhileLoading?: TState) => {
  const { appState, isLoaded} = useContext(AppStateContext)
  
  if(!isLoaded) {
    return defaultWhileLoading
  }

  const state: TState = path
    ? get(appState, path)
    : appState

    return state
}