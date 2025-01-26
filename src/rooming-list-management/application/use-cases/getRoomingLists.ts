import { RoomingListWithEvent } from "@/src/rooming-list-management/entities/models/rooming-list";
import { IRoomingListRepository } from "../repositories/rooming-list.repository.interface";

export type IGetRoomingListsByEvent = ReturnType<typeof getRoomingLists>;

export const getRoomingLists =
  (roomingListRepository: IRoomingListRepository) =>
  (query: string, filters: number[]): Promise<RoomingListWithEvent[]> => {
    return roomingListRepository.getRoomingLists(query, filters);
  };
