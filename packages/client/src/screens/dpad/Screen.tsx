import React, { useContext } from 'react'
import { DPad } from './DPad';
import { DPadDirection, Topic } from '@shared/types/common'
import { AppStateContext } from '@shared/components/AppStateContext';

function Screen() {
  const { emitHandler } = useContext(AppStateContext)

  return (
    <div>
      <h1>Player Input</h1>
      <DPad
        onUp={emitHandler?.({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.UP
        })}
        onDown={emitHandler?.({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.DOWN
        })}
        onLeft={emitHandler?.({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.LEFT
        })}
        onRight={emitHandler?.({
          topic: Topic.GAME,
          action: 'NOTIFY_D-PAD_PRESSED',
          payload: DPadDirection.RIGHT
        })}
      />
    </div>
  );
}

export default Screen;
