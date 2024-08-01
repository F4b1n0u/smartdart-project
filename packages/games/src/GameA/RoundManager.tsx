import { Topic } from '../../../shared/src/types/common';
import { GameAConfig } from './types';

const RoundManager: GameAConfig['RoundManager'] = ({
  useGameSocketEmit
}) => {
  const { emitHandler } = useGameSocketEmit()

  return (
    <div>
      <button onClick={emitHandler({
        topic: Topic.GAME,
        action: 'START_ROUND',
        payload: undefined
      })}>Ready</button>
    </div>
  );
}

export default RoundManager