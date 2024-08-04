import { useCallback, useContext } from 'react'
import { Location, SCORE_TO_INDEX, Topic } from '../../../shared/src/types/common'
import { Multiplier } from '../types'
import { AppStateContext } from '@shared/components/AppStateContext'

export const useDartBoard = () => {
  const { emit } = useContext(AppStateContext)
  const disconnect = useCallback(() => {}, [])

  const connect = useCallback(() => {
    connectToDartBoard({
      onConnected: () => {
        emit?.({
          topic: Topic.DARTBOARD,
          action: 'NOTIFY_CONNECTION_ESTABLISHED',
          // TODO try to see why we have to provide the payload, as it is marked as optional ???
          payload: undefined
        })
      },
      onDartLanding: (location: Location) => {
        emit?.({
          topic: Topic.DARTBOARD,
          action: 'NOTIFY_THROW_LANDED',
          payload: location
        })
      },
      onButtonPress: () => emit?.({
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

        // TODO check the typing of event, as it deems to not match properly so had to cast into any for now
        const { value } = event?.target! as any;
        const score = value.getUint8(0)
        const multiplier = value.getUint8(1)


        if (multiplier == 170 && score == 85) {
          onButtonPress();
          console.log('button pressed');
        } else {
          // really not fan with the casting :s
          const location = {
            score: score as Location['score'],
            multiplier: multiplierMapper[multiplier],
            index: SCORE_TO_INDEX[score]! as Location['index']
          } as Location;
          onDartLanding(location);
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
