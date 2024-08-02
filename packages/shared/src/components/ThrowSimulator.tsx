import VirtualDartboard, { touchableRadiiPercents } from './VirtualDartBoard'

type ThrowSimulatorProps = {
  onThrowMissed: () => void,
  onThrowLanded: () => void,
}
export const ThrowSimulator = ({
  onThrowMissed,
  onThrowLanded
}: ThrowSimulatorProps) => {
  return (
    <>
      <button onClick={onThrowMissed}>dart miss</button>

      <VirtualDartboard
        width={800}
        height={800}
        center={{ x: 400, y: 400 }}
        radiiPercents={touchableRadiiPercents}
        onZoneBeenHit={onThrowLanded}
        scale={4}
      />
    </>
  );
}

