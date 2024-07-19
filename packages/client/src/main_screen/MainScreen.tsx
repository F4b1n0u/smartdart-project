import { useState } from 'react'
import VirtualDartboard from '../shared/virtual_dartboard/VirtualDartboard'
import { Hit } from '../types'
import { useSocket } from '../useSocket'

const position = { x: 400, y: 400 }

const namespace = 'MainScreen'

const MainScreen = () => {
  const [hits, seHits] = useState<Array<Hit>>([])

  const { events } = useSocket(namespace, ({ action, payload }) => {
    const [,,topic] = action.split(':')
    switch(topic) {
      case 'DART_LANDED': {
        seHits((hits) => [...hits, payload])
        break;
      }
    }
  })

  return (
    <div>
      <VirtualDartboard
        height={800}
        width={800}
        center={position}
        hits={hits}
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

export default MainScreen