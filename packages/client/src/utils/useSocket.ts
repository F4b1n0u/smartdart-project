import io from 'socket.io-client';
import { Socket } from 'socket.io-client'
import { useCallback, useEffect, useMemo } from 'react';
import { Entity, Client, ClientEmitter } from '../../../shared/src/types/common';
import { FromClientEvent } from '../../../shared/src/types/events/utils/FromClientEvent';
import { ToClientEvent } from '../../../shared/src/types/events/utils/ToClientEvent';
import { CHANNEL_NAME } from '../../../shared/src/constants';
import { Subject } from 'rxjs'

// TODO see to rely on .env, ideally the same one (server/client)
const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

type EmitFn<TEmitEvent extends FromClientEvent> = (
  topic: FromClientEvent['topic'],
  action: TEmitEvent['action'],
  payload?: TEmitEvent['payload']
) => void

type EmitHandlerFn<TEmitEvent extends FromClientEvent> = ({
  topic,
  action,
  payload
}: Pick<TEmitEvent, 'topic' | 'action' | 'payload'>) => () => void

// KINDA USELESS ... as in theory you will have only one socket instance per client, so that kinda useless
// maybe we should have a dedicated getCommandSocket, and getDisplaySocket, both within their respective folder !
let sockets: Partial<Record<Client, Socket>> = {}

// TODO add error if trying to add an other entity 
const getSocket = (emitter: Client) => {
  if (sockets[emitter]) {
    return sockets[emitter]
  }
  const socket = io(
    `http://${SOCKET_IO_HOST}:${SOCKET_IO_PORT}`,
    { query: { emitter } }
  )

  sockets[emitter] = socket

  return socket
}

type UseSocketParams<
  TEmitEvent extends FromClientEvent,
  TReceiveEvent extends ToClientEvent
> = ({
  emitter: ClientEmitter,
  onEvent?: (event: TReceiveEvent, cb: EmitFn<TEmitEvent>) => void
})

export const useSocket = <
  TEmitEvent extends FromClientEvent,
  TReceiveEvent extends ToClientEvent
>({
  emitter,
  onEvent = () => {}
}: UseSocketParams<TEmitEvent, TReceiveEvent>) => {
  const socket = useMemo(
    () => getSocket(emitter),
    [emitter]
  )

  const $events = useMemo(() => new Subject(), [socket])

  const emit = useCallback<EmitFn<TEmitEvent>>((topic, action, payload) => {
    socket.emit(
      CHANNEL_NAME, {
        topic,
        action,
        payload,
        source: emitter,
        target: Entity.CONTROLLER
      })
  }, [socket])

  const emitHandler = useCallback<EmitHandlerFn<TEmitEvent>>(({ topic, action, payload }) => () => {
    emit(topic, action, payload)
  }, [emit])

  useEffect(() => {
    socket.on(CHANNEL_NAME, (event: TReceiveEvent) => {
      const { target: receiver } = event

      if (receiver === emitter) {
        onEvent(event, emit)
        $events.next(event)
      }
    });

    return () => {
      socket.off(CHANNEL_NAME);
    };
  }, [emitter, onEvent, emit, socket]);

  return {
    emitHandler,
    emit,
    $events
  }
}