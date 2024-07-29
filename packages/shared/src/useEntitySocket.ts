import io from 'socket.io-client';
import { get } from 'lodash';
import { Socket } from 'socket.io-client'
import { BehaviorSubject, SubjectLike } from 'rxjs'
import { useCallback, useEffect, useState, useMemo } from 'react';
import { AppState, Entity, Topic, Client, ClientEmitter, ClientReceiver } from './types/common';
import { FromClientEvent, ToClientEvent } from './types/events/utils/ClientEvent';
import { RequestFullAppStateEvent, NotifyAppStateChangeEvent } from './types/events/utils/utils';
import { CHANNEL_NAME } from './constants';


// TODO see to rely on .env, ideally the same one (server/client)
const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

type EmitFnParams<TEmitEvent extends FromClientEvent> = Pick<TEmitEvent, 'topic' | 'action' | 'payload'>
type EmitFn<TEmitEvent extends FromClientEvent> = (params: EmitFnParams<TEmitEvent>) => void

type EmitHandlerFn<TEmitEvent extends FromClientEvent> = (params: EmitFnParams<TEmitEvent>) => () => void

// KINDA USELESS ... as in theory you will have only one socket instance per client, so that kinda useless
// maybe we should have a dedicated getCommandSocket, and getDisplaySocket, both within their respective folder !
let sockets: Partial<Record<Client, Socket>> = {}

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
  entity: Client,
  onEvent?: (event: TReceiveEvent, cb: EmitFn<TEmitEvent>) => void
})

const useSocket = <
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

  const emit = useCallback<EmitFn<TEmitEvent>>(event => {
    socket.emit(
      CHANNEL_NAME, {
        ...event,
        source: entity,
        target: Entity.CONTROLLER
      })
  }, [socket])

  const emitHandler = useCallback<EmitHandlerFn<TEmitEvent>>(event => () => {
    emit(event)
  }, [emit])

  useEffect(() => {
    socket.on(CHANNEL_NAME, (event: TReceiveEvent) => {
      const { target: receiver } = event

      if (receiver === entity) {
        onEvent(event, emit)
      }
    });

    return () => {
      socket.off(CHANNEL_NAME);
    };
  }, [entity, onEvent, emit, socket]);

  return {
    emitHandler,
    emit
  }
}

export const useSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>(entity: ClientEmitter) => {
  return useSocket<TFromClientEvent, ToClientEvent>({ entity })
}

type ValuesOf<T> = T[keyof T];

export const useSocketState = <
  TState extends ValuesOf<AppState>,  // TODO the value of the path should define the State type
>(
  receiver: ClientReceiver,
  path: string,
  defaultWhileLoading?: TState
): [
  boolean,
  TState | undefined,
  SubjectLike<TState>,
  // TODO can it also be ToClientEvent ???
  FromClientEvent | undefined,
  SubjectLike<FromClientEvent | undefined>,
] => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [state, setState] = useState<TState>(defaultWhileLoading as TState)
  const [event, setEvent] = useState<FromClientEvent | undefined>(undefined)

  const $state = useMemo(() => new BehaviorSubject<TState>(defaultWhileLoading as TState), [path])
  const $event = useMemo(() => new BehaviorSubject<FromClientEvent | undefined>(undefined), [])

  const { emit } = useSocket<
    RequestFullAppStateEvent,
    // TODO check why the following does not work
    // NotifyAppStateChangeEvent<TTopic>
    NotifyAppStateChangeEvent
  >({
    entity: receiver,
    onEvent: ({ action, payload }) => {
      if (action === 'NOTIFY_STATE_CHANGE') {
        const { state, lastEvent } = payload
        const value = get(state, path)
        
        setState(value)
        $state.next(value)

        setEvent(lastEvent)
        $event.next(lastEvent)

        setIsLoaded(true)
      }
    }
  })

  useEffect(() => {
    emit({
      topic: Topic.STATE,
      action: 'REQUEST_FULL_APP_STATE',
      payload: undefined
    })
  }, [emit])

  return [
    isLoaded,
    state,
    $state,
    event,
    $event
  ]
}
