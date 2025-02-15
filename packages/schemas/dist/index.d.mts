import { z } from 'zod';

declare const BookingSchema: z.ZodObject<{
    bookingId: z.ZodNumber;
    hotelId: z.ZodNumber;
    eventId: z.ZodNumber;
    guestName: z.ZodString;
    guestPhoneNumber: z.ZodString;
    checkInDate: z.ZodDate;
    checkOutDate: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    bookingId: number;
    hotelId: number;
    eventId: number;
    guestName: string;
    guestPhoneNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
}, {
    bookingId: number;
    hotelId: number;
    eventId: number;
    guestName: string;
    guestPhoneNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
}>;
declare const BookingsSchema: z.ZodArray<z.ZodObject<{
    bookingId: z.ZodNumber;
    hotelId: z.ZodNumber;
    eventId: z.ZodNumber;
    guestName: z.ZodString;
    guestPhoneNumber: z.ZodString;
    checkInDate: z.ZodDate;
    checkOutDate: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    bookingId: number;
    hotelId: number;
    eventId: number;
    guestName: string;
    guestPhoneNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
}, {
    bookingId: number;
    hotelId: number;
    eventId: number;
    guestName: string;
    guestPhoneNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
}>, "many">;
type Booking = z.infer<typeof BookingSchema>;
type Bookings = z.infer<typeof BookingsSchema>;
declare const RoomingListBookingSchema: z.ZodObject<{
    bookingId: z.ZodNumber;
    roomingListId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    bookingId: number;
    roomingListId: number;
}, {
    bookingId: number;
    roomingListId: number;
}>;
type RoomingListBooking = z.infer<typeof RoomingListBookingSchema>;

declare const RoomingListSchema: z.ZodObject<{
    roomingListId: z.ZodNumber;
    eventId: z.ZodNumber;
    eventName: z.ZodString;
    hotelId: z.ZodNumber;
    rfpName: z.ZodString;
    cutOffDate: z.ZodDate;
    status: z.ZodString;
    agreement_type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    hotelId: number;
    eventId: number;
    status: string;
    roomingListId: number;
    eventName: string;
    rfpName: string;
    cutOffDate: Date;
    agreement_type: string;
}, {
    hotelId: number;
    eventId: number;
    status: string;
    roomingListId: number;
    eventName: string;
    rfpName: string;
    cutOffDate: Date;
    agreement_type: string;
}>;
type RoomingList = z.infer<typeof RoomingListSchema>;
declare const RoomingListAggSchema: z.ZodObject<z.objectUtil.extendShape<{
    roomingListId: z.ZodNumber;
    eventId: z.ZodNumber;
    eventName: z.ZodString;
    hotelId: z.ZodNumber;
    rfpName: z.ZodString;
    cutOffDate: z.ZodDate;
    status: z.ZodString;
    agreement_type: z.ZodString;
}, {
    bookingsCount: z.ZodNumber;
    minBookingDate: z.ZodDate;
    maxBookingDate: z.ZodDate;
}>, "strip", z.ZodTypeAny, {
    hotelId: number;
    eventId: number;
    status: string;
    roomingListId: number;
    eventName: string;
    rfpName: string;
    cutOffDate: Date;
    agreement_type: string;
    bookingsCount: number;
    minBookingDate: Date;
    maxBookingDate: Date;
}, {
    hotelId: number;
    eventId: number;
    status: string;
    roomingListId: number;
    eventName: string;
    rfpName: string;
    cutOffDate: Date;
    agreement_type: string;
    bookingsCount: number;
    minBookingDate: Date;
    maxBookingDate: Date;
}>;
type RoomingListAgg = z.infer<typeof RoomingListAggSchema>;
declare const RoomingListByEventNameSchema: z.ZodObject<{
    eventName: z.ZodString;
    roomingLists: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        roomingListId: z.ZodNumber;
        eventId: z.ZodNumber;
        eventName: z.ZodString;
        hotelId: z.ZodNumber;
        rfpName: z.ZodString;
        cutOffDate: z.ZodDate;
        status: z.ZodString;
        agreement_type: z.ZodString;
    }, {
        bookingsCount: z.ZodNumber;
        minBookingDate: z.ZodDate;
        maxBookingDate: z.ZodDate;
    }>, "strip", z.ZodTypeAny, {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }, {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    roomingLists: {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }[];
}, {
    eventName: string;
    roomingLists: {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }[];
}>;
type RoomingListByEventNameSchema = z.infer<typeof RoomingListsByEventNameSchema>;
declare const RoomingListsByEventNameSchema: z.ZodArray<z.ZodObject<{
    eventName: z.ZodString;
    roomingLists: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        roomingListId: z.ZodNumber;
        eventId: z.ZodNumber;
        eventName: z.ZodString;
        hotelId: z.ZodNumber;
        rfpName: z.ZodString;
        cutOffDate: z.ZodDate;
        status: z.ZodString;
        agreement_type: z.ZodString;
    }, {
        bookingsCount: z.ZodNumber;
        minBookingDate: z.ZodDate;
        maxBookingDate: z.ZodDate;
    }>, "strip", z.ZodTypeAny, {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }, {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    roomingLists: {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }[];
}, {
    eventName: string;
    roomingLists: {
        hotelId: number;
        eventId: number;
        status: string;
        roomingListId: number;
        eventName: string;
        rfpName: string;
        cutOffDate: Date;
        agreement_type: string;
        bookingsCount: number;
        minBookingDate: Date;
        maxBookingDate: Date;
    }[];
}>, "many">;
type RoomingListsByEventName = z.infer<typeof RoomingListsByEventNameSchema>;
type SearchRoomingLists = {
    filters: string[];
    query: string;
};

type Response<T> = {
    status: string;
    message?: string;
    data: T;
};

export { type Booking, BookingSchema, type Bookings, BookingsSchema, type Response, type RoomingList, type RoomingListAgg, RoomingListAggSchema, type RoomingListBooking, RoomingListBookingSchema, RoomingListByEventNameSchema, RoomingListSchema, type RoomingListsByEventName, RoomingListsByEventNameSchema, type SearchRoomingLists };
