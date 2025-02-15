import { z } from "zod";

export const BookingSchema = z.object({
  bookingId: z.number(),
  hotelId: z.number(),
  eventId: z.number(),
  guestName: z.string(),
  guestPhoneNumber: z.string(),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
});

export const BookingsSchema = z.array(BookingSchema);

export type Booking = z.infer<typeof BookingSchema>;
export type Bookings = z.infer<typeof BookingsSchema>;

export const RoomingListBookingSchema = z.object({
  bookingId: z.number(),
  roomingListId: z.number(),
});

export type RoomingListBooking = z.infer<typeof RoomingListBookingSchema>;
