import { relations } from "drizzle-orm";
import {
  doublePrecision,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roomingListBookings = pgTable(
  "DRL_Rooming_List_Bookings",
  {
    id: serial("id").primaryKey(),
    rooming_list_id: integer("rooming_list_id")
      .references(() => roomingList.id)
      .notNull(),
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
    booking_date: timestamp("booking_date").notNull(),
    order_id: varchar("order_id"),
    notes: varchar("notes"),
    crewfare_confirmation_code: varchar("crewfare_confirmation_code"),
    room_external_id: varchar("room_external_id"),
  },
  (table) => [
    index("idx_booking_date").on(table.rooming_list_id, table.booking_date),
  ]
);

export const roomingList = pgTable("DRL_Rooming_List", {
  id: serial("id").primaryKey(),
  rfp_id: integer("rfp_id")
    .notNull()
    .references(() => rfp.id)
    .notNull(),
  status_id: integer("status_id")
    .references(() => status.id)
    .notNull(),
  platform_id: integer("platform_id")
    .references(() => platform.id)
    .notNull(),
  hotel_id: integer("hotel_id")
    .references(() => hotel.id)
    .notNull(),
  cutoff_date: timestamp("cutoff_date").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  modified_at: timestamp("modified_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const roomingListRelations = relations(roomingList, ({ many, one }) => ({
  rooming_list_bookings: many(roomingListBookings),
  rfp: one(rfp, {
    fields: [roomingList.rfp_id],
    references: [rfp.rfp_launchpad_id],
  }),
  status: one(status, {
    fields: [roomingList.status_id],
    references: [status.id],
  }),
  platform: one(platform, {
    fields: [roomingList.platform_id],
    references: [platform.id],
  }),
  hotel: one(hotel, {
    fields: [roomingList.hotel_id],
    references: [hotel.id],
  }),
}));

export const bookingsRelations = relations(roomingListBookings, ({ one }) => ({
  rooming_list: one(roomingList, {
    fields: [roomingListBookings.rooming_list_id],
    references: [roomingList.id],
  }),
}));

export const hotel = pgTable("DRL_Hotel", {
  id: serial("id").primaryKey(),
  connect_id: integer("connect_id").unique(),
  name: text("name"),
  chain: varchar("chain"),
  zipcode: integer("zipcode"),
  lng: doublePrecision("lng"),
});

export const hotelRelations = relations(hotel, ({ many }) => ({
  roomingList: many(roomingList),
  user: many(user),
}));

export const status = pgTable("DRL_Status", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const statusRelations = relations(status, ({ many }) => ({
  roomingList: many(roomingList),
}));

export const platform = pgTable("DRL_Platform", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const platformRelations = relations(platform, ({ many }) => ({
  roomingList: many(roomingList),
}));

export const user = pgTable("DRL_user", {
  id: serial("id").primaryKey(),
  hotel_id: integer("hotel_id").references(() => hotel.id),
  email: varchar("email"),
});

export const userRelations = relations(user, ({ one }) => ({
  hotel: one(hotel, {
    fields: [user.hotel_id],
    references: [hotel.id],
  }),
}));

export const rfp = pgTable("DRL_Rfp", {
  id: serial("id").primaryKey(),
  rfp_launchpad_id: varchar("rfp_launchpad_id").unique(),
  event_name: text("event_name").notNull(),
  event_internal_name: text("event_internal_name").notNull(),
  event_start_date: timestamp("event_start_date").notNull(),
  event_end_date: timestamp("event_end_date").notNull(),
  agreement_type: text("agreement_type").notNull(),
  agreement_path: varchar("agreement_path").notNull(),
});

export const rfpRelations = relations(rfp, ({ many }) => ({
  roomingList: many(roomingList),
}));
