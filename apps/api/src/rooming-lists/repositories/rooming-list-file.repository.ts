import { FileSystemRepository } from 'src/common/repositories/FilesSystem.repository';

export class RoomingListFileRepository {
  private fileRepo = new FileSystemRepository('rooming-lists.json');

  async getAll() {
    return await this.fileRepo.read();
  }
}
