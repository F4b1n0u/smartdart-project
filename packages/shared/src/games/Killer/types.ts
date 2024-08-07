import { GameConfig } from "../types"
import { Player, Round } from "@shared/types/common"
import { ToGameEvent } from "@shared/types/events/GameEvent"
import { FromClientEvent } from "@shared/types/events/utils/ClientEvent"

export type KillerState = {
  status: 'IDLE' | 'RUNNING' | 'FINISHED' | 'STOPPED' | 'PAUSED'
  nextPlayerIdByCurrentPlayerId: Record<Player['id'], Player['id']>,
  currentPlayerId?: Player['id'],
  rounds: ReadonlyArray<Round>
  maxThrowsPerRound: number
  // currentKillerId: Player['id']
}

export type FromKillerEvent = FromClientEvent
export type ToKillerEvent = ToGameEvent

export type KillerConfig = GameConfig<KillerState, FromKillerEvent, ToKillerEvent>

