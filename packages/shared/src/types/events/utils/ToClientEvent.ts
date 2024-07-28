import { ToDartBoardEvent } from '../DartBoardEvent'
import { ToGamesEvent } from '../GamesEvent'
import { ToDPadEvent } from '../DPadEvent'
import { ToPlayersEvent } from '../PlayersEvent'
import { ToRoundEvent } from '../RoundEvent'
import { ToScoreEvent } from '../ScoreEvent'
import { ToSetupEvent } from '../SetupEvent'
import { ToThrowEvent } from '../ThrowEvent'

export type ToClientEvent = 
  ToDartBoardEvent |
  ToGamesEvent |
  ToDPadEvent |
  ToPlayersEvent |
  ToRoundEvent |
  ToScoreEvent |
  ToSetupEvent |
  ToThrowEvent 