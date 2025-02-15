import { fetchApi } from "@/util/fetchData";
import {
  Bookings,
  RoomingListsByEventName,
  SearchRoomingLists,
} from "@repo/schemas";

export const getEventsByEventName = async (search: SearchRoomingLists) => {
  const { data } = await fetchApi<RoomingListsByEventName>(
    "rooming-lists",
    "GET",
    {
      params: {
        status: search.filters.join(",") || undefined,
        query: search.query,
      },
    }
  );

  return data;
};

export const getBookingsByRoomingList = async (id: number) => {
  const { data } = await fetchApi<Bookings>(
    `rooming-lists/${id}/bookings`,
    "GET"
  );

  return data;
};

export const importData = async () => {
  const { data } = await fetchApi<string>(`data-import`, "POST");
  return data;
};
