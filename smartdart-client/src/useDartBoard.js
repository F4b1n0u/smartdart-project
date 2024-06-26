import { useCallback, useState } from 'react'
import { useSocket } from './useSocket'
import { Multiplier } from './types'

const namespace = 'Dartboard'

export const useDartBoard = () => {
  const [isConnected, setIsconnected] = useState(false)
  
  const { events: hits, emit } = useSocket(namespace, ({ action }) => {
    const [, , topic] = action.split(':')
    if (topic === 'CONNECTED_ACK') {
      setIsconnected(true)
    }
  })
  const disconnect = useCallback(() => {}, [])

  const connect = useCallback(() => {
    connectToDartBoard({
      onConnected: () => {
        emit('CONNECTED')
      },
      onDartLanding: (dart) => {
        emit('DART_LANDED', dart)
      },
      onButtonPress: () => emit('BUTTON_PRESSED'),
    })

    return disconnect
  }, [disconnect, emit])
  
  return {
    hits,
    connect,
    disconnect: () => {},
    isConnected
  }
}

const multiplierMapper = {
  1: Multiplier.SINGLE_SLIM,
  2: Multiplier.DOUBLE,
  0: Multiplier.SINGLE_FAT,
  3: Multiplier.TRIPLE,
}

const connectToDartBoard = async ({ onConnected, onDartLanding, onButtonPress }) => {
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
        const { value } = event.target;
        var dart = {
          score: value.getUint8(0),
          multiplier: multiplierMapper[value.getUint8(1)],
        };
        if (dart.multiplier == 170 && dart.score == 85) {
          onButtonPress();
          console.log("button pressed");
        } else {
          onDartLanding(dart);
          console.log({ dart });
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
