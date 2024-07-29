import { FromDartBoardEvent, ToDartBoardEvent } from '../DartBoardEvent'
import { FromDPadEvent, ToDPadEvent } from '../DPadEvent'
import { FromGamesEvent, ToGamesEvent } from '../GamesEvent'
import { FromPlayersEvent, ToPlayersEvent } from '../PlayersEvent'
import { FromRoundEvent, ToRoundEvent } from '../RoundEvent'
import { FromScoreEvent, ToScoreEvent } from '../ScoreEvent'
import { FromSetupEvent, ToSetupEvent } from '../SetupEvent'
import { FromThrowEvent, ToThrowEvent } from '../ThrowEvent'
import { FromGameEvent, ToGameEvent } from '../GameEvent'

export type FromClientEvent = 
  FromDartBoardEvent |
  FromDPadEvent |
  FromGamesEvent |
  FromGameEvent |
  FromPlayersEvent |
  FromRoundEvent |
  FromScoreEvent |
  FromSetupEvent |
  FromThrowEvent

export type ToClientEvent = 
  ToDartBoardEvent |
  ToDPadEvent |
  ToGamesEvent |
  ToGameEvent |
  ToPlayersEvent |
  ToRoundEvent |
  ToScoreEvent |
  ToSetupEvent |
  ToThrowEvent