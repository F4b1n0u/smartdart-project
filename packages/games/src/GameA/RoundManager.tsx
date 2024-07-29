import { Topic } from '../../../shared/src/types/common';
import { GameAConfig } from './types';
import { FromRoundEvent } from '../../../shared/src/types/events/RoundEvent';

const RoundManager: GameAConfig<FromRoundEvent>['RoundManager'] = ({
  useGameSocketEmit
}) => {
  const { emitHandler } = useGameSocketEmit()

  return (
    <div>
      <button onClick={emitHandler({
        topic: Topic.ROUNDS,
        action: 'START_ROUND',
        payload: undefined
      })}>Ready</button>
    </div>
  );
}

export default RoundManager