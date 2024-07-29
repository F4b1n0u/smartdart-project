import VirtualDartBoard from '../utils/VirtualDartBoard'
const position = { x: 400, y: 400 }

const ScoreBoard = () => {
  return (
    <div>
      <VirtualDartBoard
        height={800}
        width={800}
        center={position}
        hits={[]}
        scale={4}
      />
    </div>   
  )
}

export default ScoreBoard