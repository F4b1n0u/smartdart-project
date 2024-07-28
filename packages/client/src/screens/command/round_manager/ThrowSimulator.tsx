import { useSocket } from '../../../utils/useSocket'
import { useDartBoard } from '../../../dartboard/useDartBoard'
import VirtualDartboard, { touchableRadiiPercents } from '../../utils/VirtualDartboard'
import { useCallback } from 'react'
import { Topic, Location } from '../../../../../shared/src/types/common'
import { FromThrowEvent, ToThrowEvent } from '../../../../shared/src/types/events/ThrowsEvent'

function ThrowSimulator() {
  const { emit, emitHandler, events } = useSocket<FromThrowEvent, ToThrowEvent>({ topic: Topic.DARTBOARD })

  const { connect } = useDartBoard()

  const handleHitZoneSelected = useCallback((location: Location) => {
    emit('SIMULATE_THROW', location)
  }, [emit])

  return (
    <div>
      <h1>THROW Manager</h1>
      <button onClick={emitHandler({
        action: 'MISS_THROW',
        // TODO improve types to not have to pass ean empty payload
        payload: undefined
      })}>dart miss</button>

      <VirtualDartboard
        width={800}
        height={800}
        center={{ x: 400, y: 400 }}
        radiiPercents={touchableRadiiPercents}
        onZoneBeenHit={handleHitZoneSelected}
        scale={4}
      />
      
      <h3>THROWManager logs</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>

        {/* TODO handle dartboard connection status */}
      <button onClick={connect}>connect to dartboard</button>
    </div>
  );
}

export default ThrowSimulator;
