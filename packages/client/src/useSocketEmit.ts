import { useSocket } from "./useSocket"
import { ClientTopic } from "../../shared/src/types/common"
import { FromClientEvent } from '../../shared/src/types/events/FromClientEvent';
import { ToClientEvent } from '../../shared/src/types/events/ToClientEvent';

export const useSocketEmit = <
  TFromClientEvent extends FromClientEvent,
>(entity: ClientTopic) => {
  return useSocket<TFromClientEvent, ToClientEvent>({ entity })
}
