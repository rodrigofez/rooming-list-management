import { Module } from '@nestjs/common';
import { BookingFileRepository } from './repositories/bookings-file.repository';
import { BookingsRepository } from './repositories/bookings.repository';
import { RoomingListBookingFileRepository } from './repositories/rooming-list-booking-file.repository';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    BookingFileRepository,
    BookingsRepository,
    RoomingListBookingFileRepository,
  ],
  exports: [
    BookingsRepository,
    BookingFileRepository,
    RoomingListBookingFileRepository,
  ],
})
export class BookingsModule {}
