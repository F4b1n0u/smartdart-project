import { GameConfig } from "../types"
import { Player, Round } from "../../../shared/src/types/common"
import { FromGameEvent, ToGameEvent } from "../../../shared/src/types/events/GameEvent"

export type GameAState = {
  nextPlayerIdByCurrentPlayerId: Record<Player['id'], Player['id']>,
  currentPlayerId?: Player['id'],
  rounds: ReadonlyArray<Round>
}

export type FromGameAEvent = FromGameEvent
export type ToGameAEvent = ToGameEvent

export type GameAConfig = GameConfig<GameAState, FromGameAEvent, ToGameAEvent>

