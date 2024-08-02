import { useCallback } from 'react'
import { Location, Topic } from '../../../shared/src/types/common'
import { useDartboardSocketEmit } from './useDartboardSocket'
import { Multiplier } from '../types'
import { FromDartBoardEvent, ToDartBoardEvent } from '../../../shared/src/types/events/DartBoardEvent'

export const useDartBoard = () => {
  const { emit } = useDartboardSocketEmit<FromDartBoardEvent>()
  const disconnect = useCallback(() => {}, [])

  const connect = useCallback(() => {
    connectToDartBoard({
      onConnected: () => {
        emit({
          topic: Topic.DARTBOARD,
          action: 'NOTIFY_CONNECTION_ESTABLISHED',
          // TODO try to see why we have to provide the payload, as it is marked as optional ???
          payload: undefined
        })
      },
      onDartLanding: (location: Location) => {
        emit({
          topic: Topic.DARTBOARD,
          action: 'NOTIFY_THROW_LANDED',
          payload: location
        })
      },
      onButtonPress: () => emit({
        topic: Topic.DARTBOARD,
        action: 'NOTIFY_BUTTON_PRESSED',
        payload: undefined
      }),
    })

    return disconnect
  }, [disconnect, emit])
  
  return {
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
          namePrefix: 'Unicorn Smartboard',
        },
      ],
      optionalServices: [0xfff0],
    });
    console.log('Device:', device);

    const server = await device.gatt.connect();
    console.log('Server:', server);

    const service = await server.getPrimaryService(0xfff0);
    console.log('Service:', service);

    const led = await service.getCharacteristic(0xfff2);
    console.log('led:', led);

    const notification = await service.getCharacteristic(0xfff1);
    console.log('notification:', notification);

    notification.addEventListener(
      'characteristicvaluechanged',
      () => {
        const multiplierMapper = Object.values(Multiplier)

        const { value } = event.target;
        const score = value.getUint8(0)
        const multiplier = value.getUint8(1)


        if (multiplier == 170 && score == 85) {
          onButtonPress();
          console.log('button pressed');
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
    console.log('Notifications started');
    onConnected()
  } catch (error) {
    console.error('Error:', error);
  }
}
