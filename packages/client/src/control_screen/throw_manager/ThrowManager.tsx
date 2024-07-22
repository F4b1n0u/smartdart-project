import { useSocket } from '../../useSocket'
import { useDartBoard } from '../../useDartBoard'
import VirtualDartboard, { touchableRadiiPercents } from '../../shared/virtual_dartboard/VirtualDartboard'
import { useCallback } from 'react'
import { Entity, Dart } from '../../../../shared/src/types/common'


function ThrowManager() {
  const { emit, emitHandler, events } = useSocket(Entity.CONTROL_SCREEN)

  const { hits, connect, isConnected } = useDartBoard()

  const handleHitZoneSelected = useCallback((dart: Dart) => {
    emit('SIMULATE_DART_LANDED', dart)
  }, [emit])

  return (
    <div>
      <h1>Throw Manager</h1>
      <button onClick={emitHandler('DART_MISS')}>dart miss</button>

      <VirtualDartboard
        width={800}
        height={800}
        center={{ x: 400, y: 400 }}
        radiiPercents={touchableRadiiPercents}
        onZoneBeenHit={handleHitZoneSelected}
        scale={4}
      />
      
      <h3>ThrowManager logs</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>

      {
        isConnected
          ? <button onClick={connect}>disconnect from dartboard</button>
          : <button onClick={connect}>connect to dartboard</button>
      }
      <h3>Dartboard logs</h3>
      <ul>
        {hits.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>
    </div>
  );
}

export default ThrowManager;
