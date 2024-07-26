import { useState } from 'react'
import VirtualDartboard from '../shared/virtual_dartboard/VirtualDartboard'
import { Hit } from '../types'
import { useSocket } from '../useSocket'
import { Topic } from '../../../shared/src/types/common'
import { StateEvent, DartboardEvent, ControllerEvent} from '../../../shared/src/types/events/'
import { useSocketState } from '../useSocketState'
const position = { x: 400, y: 400 }


const ScoreBoard = () => {
  const [locations, setLocations] = useSocketState<Array<Hit>>([])

  const { events } = useSocket<ControllerEvent, StateEvent | DartboardEvent>({
    entity: Topic.SCORE_BOARD,
    onEvent: ({ action, payload }) => {
      switch(action) {
        case 'REGISTER_THROW': {
          setLocations((locations) => [...locations, payload])
          break;
        }
      }
    }
  })

  return (
    <div>
      <VirtualDartboard
        height={800}
        width={800}
        center={position}
        hits={locations}
        scale={4}
      />

      <ul>
        {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>
    </div>   
  )
}

export default ScoreBoard