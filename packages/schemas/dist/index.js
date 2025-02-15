"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BookingSchema: () => BookingSchema,
  BookingsSchema: () => BookingsSchema,
  RoomingListAggSchema: () => RoomingListAggSchema,
  RoomingListBookingSchema: () => RoomingListBookingSchema,
  RoomingListByEventNameSchema: () => RoomingListByEventNameSchema,
  RoomingListSchema: () => RoomingListSchema,
  RoomingListsByEventNameSchema: () => RoomingListsByEventNameSchema
});
module.exports = __toCommonJS(index_exports);

// src/booking.ts
var import_zod = require("zod");
var BookingSchema = import_zod.z.object({
  bookingId: import_zod.z.number(),
  hotelId: import_zod.z.number(),
  eventId: import_zod.z.number(),
  guestName: import_zod.z.string(),
  guestPhoneNumber: import_zod.z.string(),
  checkInDate: import_zod.z.coerce.date(),
  checkOutDate: import_zod.z.coerce.date()
});
var BookingsSchema = import_zod.z.array(BookingSchema);
var RoomingListBookingSchema = import_zod.z.object({
  bookingId: import_zod.z.number(),
  roomingListId: import_zod.z.number()
});

// src/rooming-list.ts
var import_zod2 = require("zod");
var RoomingListSchema = import_zod2.z.object({
  roomingListId: import_zod2.z.number(),
  eventId: import_zod2.z.number(),
  eventName: import_zod2.z.string(),
  hotelId: import_zod2.z.number(),
  rfpName: import_zod2.z.string(),
  cutOffDate: import_zod2.z.coerce.date(),
  status: import_zod2.z.string(),
  agreement_type: import_zod2.z.string()
});
var RoomingListAggSchema = RoomingListSchema.extend({
  bookingsCount: import_zod2.z.number(),
  minBookingDate: import_zod2.z.coerce.date(),
  maxBookingDate: import_zod2.z.coerce.date()
});
var RoomingListByEventNameSchema = import_zod2.z.object({
  eventName: import_zod2.z.string(),
  roomingLists: import_zod2.z.array(RoomingListAggSchema)
});
var RoomingListsByEventNameSchema = import_zod2.z.array(
  RoomingListByEventNameSchema
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookingSchema,
  BookingsSchema,
  RoomingListAggSchema,
  RoomingListBookingSchema,
  RoomingListByEventNameSchema,
  RoomingListSchema,
  RoomingListsByEventNameSchema
});
//# sourceMappingURL=index.js.map