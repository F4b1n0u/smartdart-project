import { useCallback } from 'react'
import { Location, Entity } from '../../shared/src/types/common'
import { useSocket } from './useSocket'
import { Multiplier } from './types'
import { DartboardEvent } from '../../shared/src/types/events/ControllerEvent'
import { ServerToClientEvent } from '../../shared/src/types/events/common'

export const useDartBoard = () => {
  const { events: hits, emit } = useSocket<DartboardEvent, ServerToClientEvent>(Entity.DARTBOARD)
  const disconnect = useCallback(() => {}, [])

  const connect = useCallback(() => {
    connectToDartBoard({
      onConnected: () => {
        emit('CONNECTION_ACK')
      },
      onDartLanding: (location: Location) => {
        emit('REGISTER_THROW', location)
      },
      onButtonPress: () => emit('BUTTON_PRESSED'),
    })

    return disconnect
  }, [disconnect, emit])
  
  return {
    hits,
    connect,
    disconnect: () => {},
  }
}

type ConnectToDartBoardParams = {
  onConnected: () => void,
  onDartLanding: (location: Location) => void,
  onButtonPress: () => void,
}

const connectToDartBoard = async ({ onConnected, onDartLanding, onButtonPress }: ConnectToDartBoardParams) => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        {
          namePrefix: "Unicorn Smartboard",
        },
      ],
      optionalServices: [0xfff0],
    });
    console.log("Device:", device);

    const server = await device.gatt.connect();
    console.log("Server:", server);

    const service = await server.getPrimaryService(0xfff0);
    console.log("Service:", service);

    const led = await service.getCharacteristic(0xfff2);
    console.log("led:", led);

    const notification = await service.getCharacteristic(0xfff1);
    console.log("notification:", notification);

    notification.addEventListener(
      "characteristicvaluechanged",
      () => {
        const multiplierMapper = Object.values(Multiplier)

        const { value } = event.target;
        const score = value.getUint8(0)
        const multiplier = value.getUint8(1)


        if (multiplier == 170 && score == 85) {
          onButtonPress();
          console.log("button pressed");
        } else {
          const location = {
            score,
            multiplier: multiplierMapper[multiplier],
          };
          onDartLanding(location);
          console.log({ location });
        }
      }
    );
    await notification.startNotifications();
    console.log("Notifications started");
    onConnected()
  } catch (error) {
    console.error("Error:", error);
  }
}
