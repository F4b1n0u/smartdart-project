import { FromDartBoardEvent } from '../DartBoardEvent'
import { FromGamesEvent } from '../GamesEvent'
import { FromDPadEvent } from '../DPadEvent'
import { FromPlayersEvent } from '../PlayersEvent'
import { FromRoundEvent } from '../RoundEvent'
import { FromScoreEvent } from '../ScoreEvent'
import { FromSetupEvent } from '../SetupEvent'
import { FromThrowEvent } from '../ThrowEvent'

export type FromClientEvent = 
  FromDartBoardEvent |
  FromGamesEvent |
  FromDPadEvent |
  FromPlayersEvent |
  FromRoundEvent |
  FromScoreEvent |
  FromSetupEvent |
  FromThrowEvent 