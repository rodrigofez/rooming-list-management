import { Injectable } from '@nestjs/common';
import { RoomingListRepository } from './repositories/rooming-list.repository';
import { BookingsRepository } from 'src/bookings/repositories/bookings.repository';

@Injectable()
export class RoomingListsService {
  constructor(
    private readonly roomingListRepository: RoomingListRepository,
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async findAll(query: string, filter: string[]) {
    return await this.roomingListRepository.findAll(query, filter);
  }

  async findBookings(id: number) {
    return await this.bookingsRepository.findByRoomingListId(id);
  }
}
