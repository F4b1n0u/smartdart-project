import io from 'socket.io-client';
import { get } from 'lodash';
import { Socket } from 'socket.io-client'
import { BehaviorSubject, SubjectLike } from 'rxjs'
import { useCallback, useEffect, useState, useMemo } from 'react';
import { AppState, Entity, Topic, Client, ClientEmitter, ClientReceiver } from '../types/common';
import { FromClientEvent, ToClientEvent } from '../types/events/utils/ClientEvent';
import { RequestFullAppStateEvent, NotifyAppStateChangeEvent } from '../types/events/utils/utils';
import { CHANNEL_NAME } from '../constants';

// TODO see to rely on .env, ideally the same one (server/client)
const SOCKET_IO_HOST = window.location.hostname
const SOCKET_IO_PORT = 8080

export type EmitFnParams<TEmitEvent extends FromClientEvent> = Omit<TEmitEvent, 'source' | 'target'>
export type EmitFn<TEmitEvent extends FromClientEvent> = (params: EmitFnParams<TEmitEvent>) => void
export type EmitHandlerFn<TEmitEvent extends FromClientEvent> = (params: EmitFnParams<TEmitEvent>) => () => void

// KINDA USELESS ... as in theory you will have only one socket instance per client, so that kinda useless
// maybe we should have a dedicated getCommandSocket, and getDisplaySocket, both within their respective folder !
const sockets: Partial<Record<Client, Socket>> = {}

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
    socket.emit?.(
      CHANNEL_NAME, {
        ...event,
        source: entity,
        target: Entity.CONTROLLER
      })
  }, [socket])

  const emitHandler = useCallback<EmitHandlerFn<TEmitEvent>>(event => () => {
    emit?.(event)
  }, [emit])

  const handleNewMessage = useCallback((event: TReceiveEvent) => {
    const { target: receiver } = event

    if (receiver === entity) {
      onEvent(event, emit)
    }
  }, [onEvent, emit])

  useEffect(() => {
    socket.on(CHANNEL_NAME, handleNewMessage);

    return () => {
      socket.off(CHANNEL_NAME, handleNewMessage);
    };
  }, [entity, onEvent, emit, socket]);

  return {
    emitHandler,
    emit
  }
}

export const useEntitySocketEmit = <
  TFromClientEvent extends FromClientEvent,
>(params: {
  entity: ClientEmitter,
  onEvent?: (event: ToClientEvent, cb: EmitFn<TFromClientEvent>) => void
}) => useSocket<TFromClientEvent, ToClientEvent>(params)

type ValuesOf<T> = T[keyof T];

export const useEntitySocketState = <
  TState extends ValuesOf<AppState>,  // TODO the value of the path should define the State type
>(
  receiver: ClientReceiver,
  path: string,
  defaultWhileLoading?: TState
): [
  // TODO maybe return an object rather than an array ?
  // this should be used "only" to provide a value to the AppStateContext
  // so this way you could just spread into the value rather than build an object
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

  const handleNewMessage = useCallback(
    ({ action, payload }: NotifyAppStateChangeEvent) => {
      if (action === 'SEND_LAST_APP_STATE') {
        const { state, lastEvent } = payload

        const value = path ? get(state, path) : state
        
        setState(value)
        $state.next(value)

        setEvent(lastEvent)
        $event.next(lastEvent)

        setIsLoaded(true)
      }
    },
    [$state, $event]
  )

  const { emit } = useSocket<
    RequestFullAppStateEvent,
    // TODO check why the following does not work
    // NotifyAppStateChangeEvent<TTopic>
    NotifyAppStateChangeEvent
  >({
    entity: receiver,
    onEvent: handleNewMessage
  })

  useEffect(() => {
    emit?.({
      topic: Topic.STATE,
      action: 'REQUEST_FULL_APP_STATE',
      payload: undefined
    })
  }, [])

  return [
    isLoaded,
    state,
    $state,
    event,
    $event
  ]
}