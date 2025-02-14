import { RoomingListWithEvent } from "@/core/rooming-list-management/domain/entities/rooming-list";
import { Search } from "../../domain/entities/search";
import { IRoomingListRepository } from "../../domain/repositories/rooming-list.repository.interface";

export type IGetRoomingListsByEvent = ReturnType<typeof getRoomingLists>;

export const getRoomingLists =
  (roomingListRepository: IRoomingListRepository) =>
  (query: Search): Promise<RoomingListWithEvent[]> => {
    return roomingListRepository.getRoomingLists(query);
  };
