import { Inject } from '@nestjs/common';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import * as schema from '../../db/schema';
import { DATABASE } from 'src/db/consts';
import { Booking } from '@repo/schemas';

export class BookingsRepository {
  constructor(
    @Inject(DATABASE)
    private readonly db: NeonDatabase<typeof schema>,
  ) {}

  async findByRoomingListId(roomingListId: number) {
    return this.db
      .select({
        ...getTableColumns(schema.bookings),
      })
      .from(schema.bookings)
      .leftJoin(
        schema.roomingListBookings,
        eq(schema.bookings.bookingId, schema.roomingListBookings.bookingId),
      )
      .where(and(eq(schema.roomingListBookings.roomingListId, roomingListId)));
  }

  async createMany(bookings: Booking[]) {
    return this.db.insert(schema.bookings).values(
      bookings.map((booking) => ({
        ...booking,
        checkInDate: new Date(booking.checkInDate),
        checkOutDate: new Date(booking.checkOutDate),
      })),
    );
  }

  async addToRoomingList(bookingId: number, roomingListId: number) {
    return this.db
      .insert(schema.roomingListBookings)
      .values({ bookingId, roomingListId });
  }

  async removeAll() {
    try {
      return this.db.delete(schema.bookings);
    } catch (e) {
      console.log(e);
    }
  }
}
