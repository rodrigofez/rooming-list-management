import { RoomingListBooking } from '@repo/schemas';
import { FileSystemRepository } from 'src/common/repositories/FilesSystem.repository';

export class RoomingListBookingFileRepository {
  private fileRepo = new FileSystemRepository('rooming-list-bookings.json');

  async getAll() {
    return await this.fileRepo.read<RoomingListBooking[]>();
  }
}
