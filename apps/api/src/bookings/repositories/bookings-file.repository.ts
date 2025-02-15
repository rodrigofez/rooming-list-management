import { Booking } from '@repo/schemas';
import { FileSystemRepository } from 'src/common/repositories/FilesSystem.repository';

export class BookingFileRepository {
  private fileRepo = new FileSystemRepository('bookings.json');

  async getAll() {
    return await this.fileRepo.read<Booking[]>();
  }
}
