import { useSocket } from '../useSocket';
import { DPad } from './DPad';
import { Entity } from '../../../shared/src/types/common'

function PlayerInput() {
  const { emitHandler, events } = useSocket(Entity.PLAYER_INPUT)

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
        {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerInput;
