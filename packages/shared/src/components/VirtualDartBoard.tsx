import React from 'react'
import '@pixi/events';
import { useCallback, useMemo } from 'react';
import { Stage, Graphics } from '@pixi/react';
import { PointData } from 'pixi.js';
import { Multiplier, Location, Throw, INDEX_TO_SCORE } from '../types/common'


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

type Zone = Pick<Location, 'index' | 'multiplier'>

type ZoneComponentProps = {
  location: Location,
  throws: Array<Throw>,
  center: Position,
  radiiPercents: RadiiPercents,
  onZoneBeenSelected: (zone: Zone) => void,
  scale: number
}
const ZoneComponent = ({
  location: { index, multiplier },
  throws = [],
  center,
  radiiPercents,
  onZoneBeenSelected,
  scale = 1
}: ZoneComponentProps) => {
  const offsetIndex = index - 1

  const startAngle = -90 - segmentAngle / 2 + (offsetIndex) * segmentAngle; // Start angle for the segment
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

  const hasBeenHit = !!throws.find(({ location }) => {
    const { index: hitIndex, multiplier: hitMultiplier } = location || {}
    return hitMultiplier === multiplier && index === hitIndex
  })

  const alt = offsetIndex % 2
    ? 'even'
    : 'odd'

  const color = hasBeenHit
    ? 'green'
    : colorMapping[alt][multiplier]

  const handleZoneBeenHit = useCallback(
    () => {
      onZoneBeenSelected({
        multiplier,
        index: index as Location['index'],
      })
    },
    [onZoneBeenSelected]
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

type VirtualDartBoardProps = {
  center: Position,
  throws?: Array<Throw>,
  onZoneBeenSelected?: (zone: Zone) => void,
  radiiPercents?: RadiiPercents,
  height: number,
  width: number
  scale: number
}

export const VirtualDartBoard = ({
  center,
  onZoneBeenSelected = () => {},
  radiiPercents = realRadiiPercents,
  throws = [],
  height,
  width,
  scale
}: VirtualDartBoardProps) => {
  const zones = useMemo(() => {
    return Array(totalSegments).fill('').map((_, index) => {
      // 0 is for the bull's eye
      return multipliers.map(multiplier => {
        return (
          <ZoneComponent
            scale={scale}
            key={`${index}-${multiplier}`}
            location={{ index, multiplier, score: INDEX_TO_SCORE[index]} as unknown as Location}
            throws={throws}
            center={center}
            radiiPercents={radiiPercents}
            onZoneBeenSelected={onZoneBeenSelected}
          />
        )
      })
      
    }).flat()
  }, [throws])
    
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
