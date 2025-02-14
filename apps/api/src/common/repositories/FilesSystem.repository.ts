import { promises as fs } from 'fs';
import { join } from 'path';

export class FileSystemRepository {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = join(process.cwd(), './data', fileName);
  }

  async read<T>(): Promise<T> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error reading file ${this.filePath}:`, error);
      return [] as T;
    }
  }
}
