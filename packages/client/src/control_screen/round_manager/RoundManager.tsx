import { useSocket } from '../../useSocket'
import { useDartBoard } from '../../useDartBoard'
import VirtualDartboard, { touchableRadiiPercents } from '../../shared/virtual_dartboard/VirtualDartboard'
import { useCallback } from 'react'
import { Entity, Location } from '../../../../shared/src/types/common'
import { ControlScreenEvent } from '../../../../shared/src/types/events/RoundManagerEvent'
import { FromThrowManagementEvent } from '../../../../shared/src/types/events/ControllerEvent'

function RoundManager() {
  const { emit, emitHandler, events } = useSocket<FromThrowManagementEvent, ControlScreenEvent>({ entity: Entity.ROUND_MANAGER })

  const { connect } = useDartBoard()

  const handleHitZoneSelected = useCallback((location: Location) => {
    emit('SIMULATE_THROW', location)
  }, [emit])

  return (
    <div>
      <h1>Round Manager</h1>
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
      
      <h3>RoundManager logs</h3>
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

export default RoundManager;
