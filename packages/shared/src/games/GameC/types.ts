import { GameConfig } from "../types"
import { Player, Round } from "@shared/types/common"
import { ToGameEvent } from "@shared/types/events/GameEvent"
import { FromClientEvent } from "@shared/types/events/utils/ClientEvent"

export type GameCState = {
  status: 'IDLE' | 'RUNNING' | 'FINISHED' | 'STOPPED' | 'PAUSED'
  nextPlayerIdByCurrentPlayerId: Record<Player['id'], Player['id']>,
  currentPlayerId?: Player['id'],
  rounds: ReadonlyArray<Round>
}

export type FromGameCEvent = FromClientEvent
export type ToGameCEvent = ToGameEvent

export type GameCConfig = GameConfig<GameCState, FromGameCEvent, ToGameCEvent>

