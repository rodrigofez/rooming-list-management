import { RoomingListWithEvent } from "@/src/rooming-list-management/entities/models/rooming-list";

export interface IRoomingListRepository {
  getRoomingLists(
    query: string,
    statusFilter: number[]
  ): Promise<RoomingListWithEvent[]>;
}
