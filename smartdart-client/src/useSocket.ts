import io from 'socket.io-client';
import { useCallback, useEffect, useState, useMemo } from 'react';

const CHANNEL_NAME = 'SYSTEM'
const NAMESPACE_SEPARATOR = ':'

const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

export type ActionPayloadEvent = { action: string, payload?: any }

type EmitFn = (topic: string, payload?: any) => void
type EmitHandlerFn = (
  action: ActionPayloadEvent['action'],
  payload: ActionPayloadEvent['payload']
) => EmitFn
type UseSocketFn = (
  namespace: string,
  onGameControllerUpdate: (event: ActionPayloadEvent, cb: EmitFn) => void
) => {
  emitHandler: EmitHandlerFn,
  emit: EmitFn,
  events: Array<ActionPayloadEvent>
}

export const useSocket: UseSocketFn = (
  namespace,
  onGameControllerUpdate = () => {}
) => {
  const socket = useMemo(() => io(`http://${SOCKET_IO_HOST}:${SOCKET_IO_PORT}`, {
      // secure: true,
      // rejectUnauthorized: false, // Use this only for self-signed certificates
      // withCredentials: true,
      query: {
        namespace
      }
    }), [namespace])

  const [events, setEvents] = useState<Array<ActionPayloadEvent>>([]);

  
  const emit: EmitFn = useCallback((topic, payload) => {
    socket.emit(
      CHANNEL_NAME, {
        action: [
          namespace,
          'Controller',
          topic
        ].join(NAMESPACE_SEPARATOR),
        payload
      })
  }, [namespace, socket])

  const emitHandler: EmitHandlerFn = useCallback((action, payload) => () => {
    emit(action, payload)
  }, [emit])

  useEffect(() => {
    emit('START_ACK');
    
    return () => {
      emit('STOP_ACK');
    }
  }, [emit])

  useEffect(() => {
    socket.on(CHANNEL_NAME, (event: ActionPayloadEvent) => {
      const { action } = event
      const [, target] = action.split(NAMESPACE_SEPARATOR)
      // *:ACTION_NAME or TARGET_A/TARGET_B:ACTION_NAME or simply TARGET:ACTION_NAME
      if (target === namespace) {
        setEvents(prev => {
          return [...prev, event]
        });
        onGameControllerUpdate(event, emit)
      }
    });

    return () => {
      socket.off(CHANNEL_NAME);
    };
  }, [namespace, onGameControllerUpdate, emit, socket]);

  return {
    emitHandler,
    emit,
    events
  }
}