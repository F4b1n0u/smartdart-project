import { useSocket } from '../../utils/useSocket'

import VirtualDartboard, { touchableRadiiPercents } from '../../shared/virtual_dartboard/VirtualDartboard'
import { useCallback } from 'react'
import { Topic, Location } from '../../../../shared/src/types/common'
import { FromRoundManagerEvent, ToRoundManagerEvent } from '../../../../shared/src/types/events/RoundManagerEvent'

function RoundManager() {
  const { emitHandler } = useSocket<FromRoundManagerEvent, ToRoundManagerEvent>({ topic: Topic.ROUNDS })
  
  return (
    <div>
      <h1>Round Manager</h1>
      <button onClick={emitHandler({
        action: 'MISS_THROW',
        // TODO improve types to not have to pass ean empty payload
        payload: undefined
      })}>dart miss</button>
    </div>
  );
}

export default RoundManager;
