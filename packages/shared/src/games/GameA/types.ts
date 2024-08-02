import { GameConfig } from "../types"
import { Player, Round } from "@shared/types/common"
import { ToGameEvent } from "@shared/types/events/GameEvent"
import { FromClientEvent } from "@shared/types/events/utils/ClientEvent"

export type GameAState = {
  status: 'IDLE' | 'RUNNING' | 'FINISHED' | 'STOPPED' | 'PAUSED'
  nextPlayerIdByCurrentPlayerId: Record<Player['id'], Player['id']>,
  currentPlayerId?: Player['id'],
  rounds: ReadonlyArray<Round>
}

export type FromGameAEvent = FromClientEvent
export type ToGameAEvent = ToGameEvent

export type GameAConfig = GameConfig<GameAState, FromGameAEvent, ToGameAEvent>

