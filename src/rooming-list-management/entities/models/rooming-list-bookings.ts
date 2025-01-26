import { z } from "zod";

export const roomingListBookings = z.object({
  id: z.number(),
  room_code: z.string(),
  primary_guest: z.string(),
  guests: z.number(),
  room_name: z.string(),
  check_in: z.string(),
  check_out: z.string(),
  total_nights: z.number(),
  booking_date: z.string(),
  roommates: z.string(),
});

export type RoomingListBookings = z.infer<typeof roomingListBookings>;
