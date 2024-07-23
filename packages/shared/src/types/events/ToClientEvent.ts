import { ToDartBoardEvent } from './DartBoardEvent'
import { ToGameSelectorEvent } from './GameSelectorEvent'
import { ToPlayerInputEvent } from './PlayerInputEvent'
import { ToPlayerManagerEvent } from './PlayerManagerEvent'
import { ToRoundManagerEvent } from './RoundManagerEvent'
import { ToScoreBoardEvent } from './ScoreBoardEvent'
import { ToSetupManagerEvent } from './SetupManagerEvent'
import { ToThrowManagerEvent } from './ThrowManagerEvent'

export type ToClientEvent = 
  ToDartBoardEvent |
  ToGameSelectorEvent |
  ToPlayerInputEvent |
  ToPlayerManagerEvent |
  ToRoundManagerEvent |
  ToScoreBoardEvent |
  ToSetupManagerEvent |
  ToThrowManagerEvent 