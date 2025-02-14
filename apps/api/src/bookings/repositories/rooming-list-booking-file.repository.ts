import { FileSystemRepository } from 'src/common/repositories/FilesSystem.repository';

export class RoomingListBookingFileRepository {
  private fileRepo = new FileSystemRepository('rooming-list-bookings.json');

  async getAll() {
    return await this.fileRepo.read<
      {
        roomingListId: number;
        bookingId: number;
      }[]
    >();
  }
}
