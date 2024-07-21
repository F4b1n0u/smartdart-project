import { useSocket } from '../useSocket';
import { DPad } from './DPad';
import { Entity } from '../../../shared/src/types'

function PlayerInput() {
  const { emitHandler, eventLog } = useSocket(Entity.PLAYER_INPUT)

  return (
    <div>
      <h1>Player Input</h1>
      <DPad
        onUp={emitHandler('DPAD_PRESSED', 'UP')}
        onDown={emitHandler('DPAD_PRESSED', 'DOWN')}
        onLeft={emitHandler('DPAD_PRESSED', 'LEFT')}
        onRight={emitHandler('DPAD_PRESSED', 'RIGHT')}
      />
     
      <ul>
        {eventLog.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerInput;
