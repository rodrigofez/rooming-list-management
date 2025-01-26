import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roomingListBookings = pgTable("DRL_Rooming_List_Bookings", {
  id: serial("id").primaryKey(),
  hotel_confirmation_code: varchar("hotel_confirmation_code"),
  booking_external_id: serial("booking_external_id"),
  primary_guest: varchar("primary_guest"),
  roommates: varchar("roommates"),
  guests: integer("guests"),
  hotel_name: varchar("hotel_name"),
  room_name: varchar("room_name"),
  check_in: timestamp("check_in").notNull(),
  check_out: timestamp("check_out").notNull(),
  total_nights: integer("total_nights"),
  order_id: varchar("order_id"),
  notes: varchar("notes"),
  crewfare_confirmation_code: varchar("crewfare_confirmation_code"),
  room_external_id: varchar("room_external_id"),
});
