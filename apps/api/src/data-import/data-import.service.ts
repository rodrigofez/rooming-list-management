import { Injectable } from '@nestjs/common';
import { BookingFileRepository } from 'src/bookings/repositories/bookings-file.repository';
import { BookingsRepository } from 'src/bookings/repositories/bookings.repository';
import { RoomingListBookingFileRepository } from 'src/bookings/repositories/rooming-list-booking-file.repository';
import { RoomingListFileRepository } from 'src/rooming-lists/repositories/rooming-list-file.repository';
import { RoomingListRepository } from 'src/rooming-lists/repositories/rooming-list.repository';

@Injectable()
export class DataImportService {
  constructor(
    private roomingListRepository: RoomingListRepository,
    private bookingsRepository: BookingsRepository,
    private roomingListFileRepository: RoomingListFileRepository,
    private bookingFileRepository: BookingFileRepository,
    private RoomingListBookingFileRepository: RoomingListBookingFileRepository,
  ) {}

  async import() {
    await this.roomingListRepository.removeAll();
    await this.bookingsRepository.removeAll();

    const roomingLists = await this.roomingListFileRepository.getAll();
    const bookings = await this.bookingFileRepository.getAll();
    const roomingListBookings =
      await this.RoomingListBookingFileRepository.getAll();

    await this.roomingListRepository.createMany(roomingLists);
    await this.bookingsRepository.createMany(bookings);

    for (const roomingListBooking of roomingListBookings) {
      await this.bookingsRepository.addToRoomingList(
        roomingListBooking.bookingId,
        roomingListBooking.roomingListId,
      );
    }

    return 'data successfully imported';
  }
}
