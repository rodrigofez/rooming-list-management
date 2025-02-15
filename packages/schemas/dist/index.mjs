// src/booking.ts
import { z } from "zod";
var BookingSchema = z.object({
  bookingId: z.number(),
  hotelId: z.number(),
  eventId: z.number(),
  guestName: z.string(),
  guestPhoneNumber: z.string(),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date()
});
var BookingsSchema = z.array(BookingSchema);
var RoomingListBookingSchema = z.object({
  bookingId: z.number(),
  roomingListId: z.number()
});

// src/rooming-list.ts
import { z as z2 } from "zod";
var RoomingListSchema = z2.object({
  roomingListId: z2.number(),
  eventId: z2.number(),
  eventName: z2.string(),
  hotelId: z2.number(),
  rfpName: z2.string(),
  cutOffDate: z2.coerce.date(),
  status: z2.string(),
  agreement_type: z2.string()
});
var RoomingListAggSchema = RoomingListSchema.extend({
  bookingsCount: z2.number(),
  minBookingDate: z2.coerce.date(),
  maxBookingDate: z2.coerce.date()
});
var RoomingListByEventNameSchema = z2.object({
  eventName: z2.string(),
  roomingLists: z2.array(RoomingListAggSchema)
});
var RoomingListsByEventNameSchema = z2.array(
  RoomingListByEventNameSchema
);
export {
  BookingSchema,
  BookingsSchema,
  RoomingListAggSchema,
  RoomingListBookingSchema,
  RoomingListByEventNameSchema,
  RoomingListSchema,
  RoomingListsByEventNameSchema
};
//# sourceMappingURL=index.mjs.map