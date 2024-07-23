import { useSocket } from "./useSocket"
import { ClientEntity } from "../../shared/src/types/common"
import { FromClientEvent } from '../../shared/src/types/events/FromClientEvent';
import { ToClientEvent } from '../../shared/src/types/events/ToClientEvent';

export const useSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>(entity: ClientEntity) => {
  const { emit } = useSocket<TFromClientEvent, ToClientEvent>({ entity })

  return emit
}
