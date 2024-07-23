import { useSocket } from '../useSocket';
import { DPad } from './DPad';
import { Entity } from '../../../shared/src/types/common'

function PlayerInput() {
  const { emitHandler, events } = useSocket({ entity: Entity.PLAYER_INPUT })

  return (
    <div>
      <h1>Player Input</h1>
      <DPad
        onUp={emitHandler({
          action: 'DPAD_PRESSED',
          payload: 'UP'
        })}
        onDown={emitHandler({
          action: 'DPAD_PRESSED',
          payload: 'DOWN'
        })}
        onLeft={emitHandler({
          action: 'DPAD_PRESSED',
          payload: 'LEFT'
        })}
        onRight={emitHandler({
          action: 'DPAD_PRESSED',
          payload: 'RIGHT'
        })}
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
