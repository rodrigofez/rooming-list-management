import { RoomingListWithEvent } from "@/core/rooming-list-management/domain/entities/rooming-list";
import { Search } from "../entities/search";

export interface IRoomingListRepository {
  getRoomingLists(searchTerm: Search): Promise<RoomingListWithEvent[]>;
}
