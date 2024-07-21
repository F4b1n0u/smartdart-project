import io from 'socket.io-client';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Entity } from '../../shared/src/types';

const CHANNEL_NAME = 'SYSTEM'
const NAMESPACE_SEPARATOR = ':'

const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

export type ActionPayloadEvent = { action: string, payload?: any }

type EmitFn = (topic: string, payload?: any) => void
type EmitHandlerFn = (
  action: ActionPayloadEvent['action'],
  payload?: ActionPayloadEvent['payload']
) => EmitFn
type UseSocketFn = (
  socketId: Entity,
  onEvent?: (event: ActionPayloadEvent, cb: EmitFn) => void
) => {
  emitHandler: EmitHandlerFn,
  emit: EmitFn,
  events: Array<ActionPayloadEvent>
}

export const useSocket: UseSocketFn = (
  socketId,
  onEvent = () => {}
) => {
  const socket = useMemo(() => io(`http://${SOCKET_IO_HOST}:${SOCKET_IO_PORT}`, {
      // secure: true,
      // rejectUnauthorized: false, // Use this only for self-signed certificates
      // withCredentials: true,
      query: {
        socketId
      }
    }), [socketId])

  const [events, setEvents] = useState<Array<ActionPayloadEvent>>([]);

  
  const emit: EmitFn = useCallback((topic, payload) => {
    socket.emit(
      CHANNEL_NAME, {
        action: [
          socketId,
          'Controller',
          topic
        ].join(NAMESPACE_SEPARATOR),
        payload
      })
  }, [socketId, socket])

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
      const [, receiverId] = action.split(NAMESPACE_SEPARATOR)

      if (receiverId === socketId) {
        setEvents(prev => {
          return [...prev, event]
        });
        onEvent(event, emit)
      }
    });

    return () => {
      socket.off(CHANNEL_NAME);
    };
  }, [socketId, onEvent, emit, socket]);

  return {
    emitHandler,
    emit,
    events
  }
}