import { FromDartBoardEvent, ToDartBoardEvent } from '../DartBoardEvent'
// import { FromDPadEvent, ToDPadEvent } from '../DPadEvent'
import { FromGamesEvent, ToGamesEvent } from '../GamesEvent'
import { FromPlayersEvent, ToPlayersEvent } from '../PlayersEvent'
// import { FromRoundEvent, ToRoundEvent } from '../RoundEvent'
// import { FromScoreEvent, ToScoreEvent } from '../ScoreEvent'
import { FromSetupEvent, ToSetupEvent } from '../SetupEvent'
// import { FromThrowEvent, ToThrowEvent } from '../ThrowEvent'
import { FromGameEvent, ToGameEvent } from '../GameEvent'

export type FromClientEvent = 
  FromDartBoardEvent |
  FromGamesEvent |
  FromGameEvent |
  FromPlayersEvent |
  FromSetupEvent

export type ToClientEvent = 
  ToDartBoardEvent |
  ToGamesEvent |
  ToGameEvent |
  ToPlayersEvent |
  ToSetupEvent