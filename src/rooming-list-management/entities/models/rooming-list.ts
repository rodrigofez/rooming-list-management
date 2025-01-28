import { z } from "zod";
import { Rfp } from "./rfp";

export const roomingListSchema = z.object({
  id: z.number(),
  status_id: z.number(),
  rfp_id: z.number(),
  hotel_id: z.number(),
  platform_id: z.number(),
  cutoff_date: z.date(),
  created_at: z.date(),
  modified_at: z.date(),
});

export type RoomingList = z.infer<typeof roomingListSchema>;

export type RoomingListWithEvent = RoomingList & {
  bookings: number;
  drl_rfp: Rfp;
  min_booking_date: Date;
  max_booking_date: Date;
};
