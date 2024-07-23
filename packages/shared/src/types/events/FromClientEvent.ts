import { FromDartBoardEvent } from './DartBoardEvent'
import { FromGameSelectorEvent } from './GameSelectorEvent'
import { FromPlayerInputEvent } from './PlayerInputEvent'
import { FromPlayerManagerEvent } from './PlayerManagerEvent'
import { FromRoundManagerEvent } from './RoundManagerEvent'
import { FromScoreBoardEvent } from './ScoreBoardEvent'
import { FromSetupManagerEvent } from './SetupManagerEvent'
import { FromThrowManagerEvent } from './ThrowManagerEvent'

export type FromClientEvent = 
  FromDartBoardEvent |
  FromGameSelectorEvent |
  FromPlayerInputEvent |
  FromPlayerManagerEvent |
  FromRoundManagerEvent |
  FromScoreBoardEvent |
  FromSetupManagerEvent |
  FromThrowManagerEvent 