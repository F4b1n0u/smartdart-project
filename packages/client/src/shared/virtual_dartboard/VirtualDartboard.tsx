import { useCallback, useMemo } from 'react';
import { Stage, Graphics } from '@pixi/react';
import { PointData } from 'pixi.js';
import { Multiplier, Zone, Hit } from '../../types'
import '@pixi/events';
import { Location } from '../../../../shared/src/types/common';

const totalSegments = 20;
const multipliers = Object.values(Multiplier);

export type ColorMapping = {
  even: {
    [key in  Multiplier]: string
  },
  odd: {
    [key in  Multiplier]: string
  }
}
const colorMapping: ColorMapping = {
  even: {
    [Multiplier.SINGLE_SLIM]: 'white',
    [Multiplier.TRIPLE]: 'blue',
    [Multiplier.SINGLE_FAT]: 'white',
    [Multiplier.DOUBLE]: 'blue',
  },
  odd: {
    [Multiplier.SINGLE_SLIM]: 'black',
    [Multiplier.TRIPLE]: 'red',
    [Multiplier.SINGLE_FAT]: 'black',
    [Multiplier.DOUBLE]: 'red',
  },
};
const segmentAngle = 360 / totalSegments; // Each segment covers 18 degrees
const BOARD = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
];

type polarToCartesianFn = (
  radius: number,
  angleInRadians: number,
  center: PointData
) => PointData
const polarToCartesian: polarToCartesianFn = (radius, angleInRadians, center) => {
  return {
    x: center.x + radius * Math.cos(angleInRadians),
    y: center.x + radius * Math.sin(angleInRadians),
  };
}

export type RadiiPercents = {
  [key in Multiplier]: [number, number]
}
export const realRadiiPercents: RadiiPercents = {
  [Multiplier.SINGLE_SLIM]: [11, 57],
  [Multiplier.TRIPLE]: [57, 61], 
  [Multiplier.SINGLE_FAT]: [61, 91],
  [Multiplier.DOUBLE]: [91, 100], 
}

const ratio = 100/11
export const touchableRadiiPercents: RadiiPercents = {
  [Multiplier.SINGLE_SLIM]: [2 * ratio, 5 * ratio],
  [Multiplier.TRIPLE]:      [5 * ratio, 7 * ratio],
  [Multiplier.SINGLE_FAT]:  [7 * ratio, 9 * ratio],
  [Multiplier.DOUBLE]:      [9 * ratio, 11 * ratio],
}
type Position = {
  x: number,
  y: number,
}

type ZoneComponentProps = {
  zone: Zone,
  hits: Array<Hit>,
  center: Position,
  radiiPercents: RadiiPercents,
  onZoneBeenHit: (hit: Hit) => void,
  scale: number
}
const ZoneComponent = ({
  zone: { index, multiplier },
  hits,
  center,
  radiiPercents,
  onZoneBeenHit,
  scale = 1
}: ZoneComponentProps) => {
  const startAngle = -90 - segmentAngle / 2 + index * segmentAngle; // Start angle for the segment
  const endAngle = startAngle + segmentAngle; // End angle for the segment
  const startAngleInRadian = (Math.PI / 180) * startAngle;
  const endAngleInRadian = (Math.PI / 180) * endAngle;

  const [innerRadius, outerRadius] = radiiPercents[multiplier];

  const startInner = polarToCartesian(
    innerRadius * scale,
    startAngleInRadian,
    center
  );
  const endOuter = polarToCartesian(outerRadius * scale, endAngleInRadian, center);

  const hasBeenHit = !!hits.find((hit) => BOARD.indexOf(hit.score) === index && hit.multiplier === multiplier)
  const alt = index % 2
    ? 'even'
    : 'odd'

  const color = hasBeenHit
    ? 'green'
    : colorMapping[alt][multiplier]

  const handleZoneBeenHit = useCallback(
    () => {
      onZoneBeenHit({
        score: BOARD[index],
        multiplier,
      })
    },
    [onZoneBeenHit]
  )

  return (
    <Graphics
      interactive={true}
      pointerdown={handleZoneBeenHit}
      key={`${index}-${multiplier}`}
      draw={(g) => {
        g.beginFill(color);
        g.moveTo(startInner.x, startInner.y);
        g.arc(
          center.x,
          center.y,
          innerRadius * scale,
          startAngleInRadian,
          endAngleInRadian
        );
        g.lineTo(endOuter.x, endOuter.y);
        g.arc(
          center.x,
          center.y,
          outerRadius * scale,
          endAngleInRadian,
          startAngleInRadian,
          true
        );
        g.lineTo(startInner.x, startInner.y);
        g.endFill()
        g.closePath();
      }}
    />
  )
}

type VirtualDartboardProps = {
  center: Position,
  hits?: Array<Hit>,
  onZoneBeenHit?: (dart: Location) => void,
  radiiPercents?: RadiiPercents,
  height: number,
  width: number
  scale: number
}

const VirtualDartboard = ({
  center,
  onZoneBeenHit = () => {},
  radiiPercents = realRadiiPercents,
  hits = [],
  height,
  width,
  scale
}: VirtualDartboardProps) => {
  const zones = useMemo(() => {
    return Array(totalSegments).fill('').map((_, index) => {
      return multipliers.map(multiplier => {
        return (
          <ZoneComponent
            scale={scale}
            key={`${index}-${multiplier}`}
            zone={{ index, multiplier }}
            hits={hits}
            center={center}
            radiiPercents={radiiPercents}
            onZoneBeenHit={onZoneBeenHit}
          />
        )
      })
    }).flat()
  }, [hits])
    
  return (
    <Stage
      height={height}
      width={width}
      options={{
        backgroundAlpha: 0
      }}
    >
      {zones}
    </Stage>
  );
}

export default VirtualDartboard;
