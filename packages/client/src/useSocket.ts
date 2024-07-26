import io from 'socket.io-client';
import { Socket } from 'socket.io-client'
import { useCallback, useEffect, useState, useMemo } from 'react';
import { ClientTopic, Topic } from '../../shared/src/types/common';
import { FromClientEvent } from '../../shared/src/types/events/FromClientEvent';
import { ToClientEvent } from '../../shared/src/types/events/ToClientEvent';
import { CHANNEL_NAME } from '../../shared/src/constants';

// TODO see to rely on .env, ideally the same one (server/client)
const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

type EmitFn<TEmitEvent extends FromClientEvent> = (action: TEmitEvent['action'], payload?: TEmitEvent['payload']) => void

type EmitHandlerFn<TEmitEvent extends FromClientEvent> = ({
  action,
  payload
}: Pick<TEmitEvent, 'action' | 'payload'>) => () => void

let sockets: Partial<Record<ClientTopic, Socket>> = {
    [Topic.SCORE_BOARD]: undefined,
    [Topic.PLAYER_MANAGER]: undefined,
    [Topic.GAME_SELECTOR]: undefined,
    [Topic.ROUND_MANAGER]: undefined,
    [Topic.THROW_MANAGER]: undefined,
    [Topic.SETUP_HANDLER]: undefined,
    [Topic.PLAYER_INPUT]: undefined,
    [Topic.DARTBOARD]: undefined,
}

const getSocket = (entity: ClientTopic) => {
  if (sockets[entity]) {
    return sockets[entity]
  }
  const socket = io(
    `http://${SOCKET_IO_HOST}:${SOCKET_IO_PORT}`,
    {
      query: {
        emitter: entity
      }
    }
  )

  sockets[entity] = socket

  return socket
}

type UseSocketParams<
  TEmitEvent extends FromClientEvent,
  TReceiveEvent extends ToClientEvent
> = ({
  entity: ClientTopic,
  onEvent?: (event: TReceiveEvent, cb: EmitFn<TEmitEvent>) => void
})

export const useSocket = <
  TEmitEvent extends FromClientEvent,
  TReceiveEvent extends ToClientEvent
>({
  entity,
  onEvent = () => {}
}: UseSocketParams<TEmitEvent, TReceiveEvent>) => {
  const socket = useMemo(
    () => getSocket(entity),
    [entity]
  )

  const [events, setEvents] = useState<Array<ToClientEvent>>([]);

  const emit= useCallback<EmitFn<TEmitEvent>>((topic, payload) => {
    socket.emit(
      CHANNEL_NAME, {
        action: topic,
        source: entity,
        target: Topic.CONTROLLER,
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