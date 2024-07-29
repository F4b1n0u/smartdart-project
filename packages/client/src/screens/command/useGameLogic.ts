import { AppState, Topic } from "../../../../shared/src/types/common"
import { FromGameEvent } from "../../../../shared/src/types/events/GameEvent"
import { useCommandSocketEmit, useCommandSocketState } from "./useCommandSocket"
import { useSelectedGameConfig } from "./useSelectedGameConfig"

export const useGameLogic = () => {
  const { config } = useSelectedGameConfig()
  
  const [ ,appState, , event ] = useCommandSocketState<AppState<unknown>>('', undefined)
  const { emit } = useCommandSocketEmit<FromGameEvent>()


  if (config && appState) {
    const { onEvent } = config!;

    // TODO how can I improve this casting of the appState
    const updatedGameState = onEvent(event, appState as any, emit)

    if (updatedGameState) {
      emit({
        topic: Topic.GAME,
        action: 'UPDATE_GAME_STATE',
        payload: updatedGameState
      })
    }
  }

  // listen to state changes (maybe ignore GAME STATE UPDATE to avoid loops)
  // to get the latest:
  //   - app and game state
  //   - event
  // run the config logic with those
  // get the latest game state and send an update
}