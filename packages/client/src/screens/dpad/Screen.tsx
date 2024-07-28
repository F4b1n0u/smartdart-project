import { useDPadSocketEmit } from './useDPadSocket';
import { DPad } from './DPad';
import { DPadDirection, Topic } from '../../../../shared/src/types/common'
import { FromDPadEvent } from '../../../../shared/src/types/events/DPadEvent';

function Screen() {
  const { emitHandler } = useDPadSocketEmit<FromDPadEvent>()

  return (
    <div>
      <h1>Player Input</h1>
      <DPad
        onUp={emitHandler({
          topic: Topic.D_PAD,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.UP
        })}
        onDown={emitHandler({
          topic: Topic.D_PAD,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.DOWN
        })}
        onLeft={emitHandler({
          topic: Topic.D_PAD,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.LEFT
        })}
        onRight={emitHandler({
          topic: Topic.D_PAD,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.RIGHT
        })}
      />
    </div>
  );
}

export default Screen;
