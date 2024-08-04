import { GameConfig } from "../types"
import { Player, Round } from "@shared/types/common"
import { ToGameEvent } from "@shared/types/events/GameEvent"
import { FromClientEvent } from "@shared/types/events/utils/ClientEvent"

export type GameBState = {
  status: 'IDLE' | 'RUNNING' | 'FINISHED' | 'STOPPED' | 'PAUSED'
  nextPlayerIdByCurrentPlayerId: Record<Player['id'], Player['id']>,
  currentPlayerId?: Player['id'],
  rounds: ReadonlyArray<Round>
}

export type FromGameBEvent = FromClientEvent
export type ToGameBEvent = ToGameEvent

export type GameBConfig = GameConfig<GameBState, FromGameBEvent, ToGameBEvent>

