import { Controller, Post } from '@nestjs/common';
import { DataImportService } from './data-import.service';

@Controller('data-import')
export class DataImportController {
  constructor(private readonly dataImportService: DataImportService) {}

  @Post()
  async import() {
    return await this.dataImportService.import();
  }
}
