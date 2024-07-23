import io from 'socket.io-client';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { ClientEntity, Entity } from '../../shared/src/types/common';
import { ClientToServerEvents, ServerToClientEvent} from '../../shared/src/types/events/common';
import { CHANNEL_NAME } from '../../shared/src/constants';

// TODO see to rely on .env, ideally the same one (server/client)
const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

type EmitFn<TEmitEvent extends ClientToServerEvents> = (action: TEmitEvent['action'], payload?: TEmitEvent['payload']) => void

type EmitHandlerFn<TEmitEvent extends ClientToServerEvents> = ({
  action,
  payload
}: Pick<TEmitEvent, 'action' | 'payload'>) => () => void

type UseSocketParams<
  TEmitEvent extends ClientToServerEvents,
  TReceiveEvent extends ServerToClientEvent
> = ({
  entity: ClientEntity,
  onEvent?: (event: TReceiveEvent, cb: EmitFn<TEmitEvent>) => void
})

export const useSocket = <
  TEmitEvent extends ClientToServerEvents,
  TReceiveEvent extends ServerToClientEvent
>({
  entity,
  onEvent = () => {}
}: UseSocketParams<TEmitEvent, TReceiveEvent>) => {
  const socket = useMemo(
    () => io(
      `http://${SOCKET_IO_HOST}:${SOCKET_IO_PORT}`,
      {
        query: {
          emitterEntityId: entity
        }
      }
    ),
    [entity]
  )

  const [events, setEvents] = useState<Array<ServerToClientEvent>>([]);

  const emit= useCallback<EmitFn<TEmitEvent>>((topic, payload) => {
    socket.emit(
      CHANNEL_NAME, {
        action: topic,
        source: entity,
        target: Entity.CONTROLLER,
        payload
      })
  }, [entity, socket])

  const emitHandler = useCallback<EmitHandlerFn<TEmitEvent>>(({ action, payload }) => () => {
    emit(action, payload)
  }, [emit])

  useEffect(() => {
    socket.on(CHANNEL_NAME, (event: TReceiveEvent) => {
      const { target: receiver } = event

      if (receiver === entity) {
        setEvents(prev => {
          return [...prev, event]
        });
        onEvent(event, emit)
      }
    });

    return () => {
      socket.off(CHANNEL_NAME);
    };
  }, [entity, onEvent, emit, socket]);

  return {
    emitHandler,
    emit,
    events
  }
}