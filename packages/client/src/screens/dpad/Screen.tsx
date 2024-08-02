import React from 'react'
import { useDPadSocketEmit } from './useDPadSocket';
import { DPad } from './DPad';
import { DPadDirection, Topic } from '@shared/types/common'
import { FromDPadEvent } from '@shared/types/events/DPadEvent';

function Screen() {
  const { emitHandler } = useDPadSocketEmit<FromDPadEvent>()

  return (
    <div>
      <h1>Player Input</h1>
      <DPad
        onUp={emitHandler({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.UP
        })}
        onDown={emitHandler({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.DOWN
        })}
        onLeft={emitHandler({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.LEFT
        })}
        onRight={emitHandler({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.RIGHT
        })}
      />
    </div>
  );
}

export default Screen;
