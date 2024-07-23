import { useState } from 'react'
import VirtualDartboard from '../shared/virtual_dartboard/VirtualDartboard'
import { Hit } from '../types'
import { useSocket } from '../useSocket'
import { Entity } from '../../../shared/src/types/common'
import { StateEvent, DartboardEvent, ControllerEvent} from '../../../shared/src/types/events/ControllerEvent'
const position = { x: 400, y: 400 }


const DisplayScreen = () => {
  const [locations, setLocations] = useState<Array<Hit>>([])

  const { events } = useSocket<ControllerEvent, StateEvent | DartboardEvent>({
    entity: Entity.DISPLAY_SCREEN,
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

export default DisplayScreen