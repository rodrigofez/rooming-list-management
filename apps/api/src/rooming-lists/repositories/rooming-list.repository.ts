import { Inject } from '@nestjs/common';
import { RoomingList } from '@repo/schemas';
import {
  and,
  count,
  eq,
  getTableColumns,
  ilike,
  inArray,
  max,
  min,
  or,
  sql,
} from 'drizzle-orm';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import { DATABASE } from 'src/db/consts';
import * as schema from 'src/db/schema';
import { bookings, roomingList, roomingListBookings } from 'src/db/schema';

export class RoomingListRepository {
  constructor(
    @Inject(DATABASE)
    private readonly db: NeonDatabase<typeof schema>,
  ) {}

  async findAll(query: string = '', status: string[] = []) {
    const subquery = this.db
      .select({
        ...getTableColumns(roomingList),
        bookingsCount: count(roomingListBookings.bookingId).as('bookingsCount'),
        minBookingDate: min(bookings.checkInDate).as('minBookingDate'),
        maxBookingDate: max(bookings.checkOutDate).as('maxBookingDate'),
      })
      .from(roomingList)
      .leftJoin(
        roomingListBookings,
        eq(roomingList.roomingListId, roomingListBookings.roomingListId),
      )
      .leftJoin(bookings, eq(bookings.bookingId, roomingListBookings.bookingId))
      .where(
        and(
          query
            ? or(
                ilike(roomingList.eventName, `%${query}%`),
                ilike(roomingList.rfpName, `%${query}%`),
                ilike(roomingList.agreement_type, `%${query}%`),
              )
            : undefined,
          status.length ? inArray(roomingList.status, status) : undefined,
        ),
      )
      .groupBy(roomingList.roomingListId)
      .as('subquery');

    return await this.db
      .select({
        eventName: subquery.eventName,
        roomingLists: sql`
           json_agg(
             json_build_object(
               'roomingListId', ${subquery.roomingListId},
               'eventId', ${subquery.eventId},
               'eventName', ${subquery.eventName},
               'hotelId', ${subquery.hotelId},
               'rfpName', ${subquery.rfpName},
               'cutOffDate', ${subquery.cutOffDate},
               'status', ${subquery.status},
               'agreement_type', ${subquery.agreement_type},
               'bookingsCount', ${subquery.bookingsCount},
               'minBookingDate', ${subquery.minBookingDate},
               'maxBookingDate', ${subquery.maxBookingDate}
             )
           )`.as('roomingLists'),
      })
      .from(subquery)
      .groupBy(subquery.eventName);
  }

  async createMany(roomingLists: RoomingList[]) {
    return this.db.insert(schema.roomingList).values(
      roomingLists.map((booking) => ({
        ...booking,
        cutOffDate: new Date(booking.cutOffDate),
      })),
    );
  }

  async removeAll() {
    return this.db.delete(schema.roomingList);
  }
}
