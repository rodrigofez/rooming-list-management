import { z } from "zod";

export const RoomingListSchema = z.object({
  roomingListId: z.number(),
  eventId: z.number(),
  eventName: z.string(),
  hotelId: z.number(),
  rfpName: z.string(),
  cutOffDate: z.coerce.date(),
  status: z.string(),
  agreement_type: z.string(),
});

export type RoomingList = z.infer<typeof RoomingListSchema>;

export const RoomingListAggSchema = RoomingListSchema.extend({
  bookingsCount: z.number(),
  minBookingDate: z.coerce.date(),
  maxBookingDate: z.coerce.date(),
});

export type RoomingListAgg = z.infer<typeof RoomingListAggSchema>;

export const RoomingListByEventNameSchema = z.object({
  eventName: z.string(),
  roomingLists: z.array(RoomingListAggSchema),
});

export type RoomingListByEventNameSchema = z.infer<
  typeof RoomingListsByEventNameSchema
>;

export const RoomingListsByEventNameSchema = z.array(
  RoomingListByEventNameSchema
);

export type RoomingListsByEventName = z.infer<
  typeof RoomingListsByEventNameSchema
>;

export type SearchRoomingLists = {
  filters: string[];
  query: string;
};
