import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const bookings = pgTable('Bookings', {
  bookingId: serial('bookingId').primaryKey(),
  hotelId: integer('hotelId').notNull(),
  eventId: integer('eventId').notNull(),
  guestName: varchar('guestName').notNull(),
  guestPhoneNumber: varchar('guestPhoneNumber').notNull(),
  checkInDate: timestamp('checkInDate').notNull(),
  checkOutDate: timestamp('checkOutDate').notNull(),
});

export const bookingsRelations = relations(bookings, ({ many }) => ({
  roomingListBookings: many(roomingListBookings),
}));

export const roomingList = pgTable('Rooming_Lists', {
  roomingListId: serial('roomingListId').primaryKey(),
  eventId: integer('eventId').notNull(),
  eventName: text('eventName').notNull(),
  hotelId: integer('hotelId').notNull(),
  rfpName: text('rfpName').notNull(),
  cutOffDate: timestamp('cutOffDate').notNull(),
  status: varchar('status').notNull(),
  agreement_type: varchar('agreement_type').notNull(),
});

export const roomingListRelations = relations(roomingList, ({ many }) => ({
  roomingListBookings: many(roomingListBookings),
}));

export const roomingListBookings = pgTable(
  'Rooming_List_Bookings',
  {
    roomingListId: integer('roomingListId')
      .references(() => roomingList.roomingListId, { onDelete: 'cascade' })
      .notNull(),
    bookingId: integer('bookingId')
      .references(() => bookings.bookingId, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.bookingId, t.roomingListId] })],
);

export const roomingListBookingsRelations = relations(
  roomingListBookings,
  ({ one }) => ({
    bookings: one(bookings, {
      fields: [roomingListBookings.bookingId],
      references: [bookings.bookingId],
    }),
    roomingLists: one(roomingList, {
      fields: [roomingListBookings.roomingListId],
      references: [roomingList.roomingListId],
    }),
  }),
);
