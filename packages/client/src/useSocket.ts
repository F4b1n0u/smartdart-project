import io from 'socket.io-client';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Entity } from '../../shared/src/types/common';
import { ClientToServerEvents, ServerToClientEvent} from '../../shared/src/types/event';

const CHANNEL_NAME = 'SYSTEM'

const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

type EmitFn = (topic: string, payload?: any) => void
type EmitHandlerFn = (
  action: ClientToServerEvents['action'],
  payload?: ClientToServerEvents['payload']
) => () => void
type UseSocketFn = (
  socketId: Entity,
  onEvent?: (event: ServerToClientEvent, cb: EmitFn) => void
) => {
  emitHandler: EmitHandlerFn,
  emit: EmitFn,
  events: Array<ServerToClientEvent>
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

  const [events, setEvents] = useState<Array<ServerToClientEvent>>([]);

  
  const emit: EmitFn = useCallback((topic, payload) => {
    socket.emit(
      CHANNEL_NAME, {
        action: topic,
        source: socketId,
        target: Entity.CONTROLLER,
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
    socket.on(CHANNEL_NAME, (event: ServerToClientEvent) => {
      const { target } = event

      if (target === socketId) {
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