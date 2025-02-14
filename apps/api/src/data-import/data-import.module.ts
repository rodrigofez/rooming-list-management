import { Module } from '@nestjs/common';
import { DataImportService } from './data-import.service';
import { DataImportController } from './data-import.controller';
import { BookingsModule } from 'src/bookings/bookings.module';
import { RoomingListsModule } from 'src/rooming-lists/rooming-lists.module';

@Module({
  imports: [BookingsModule, RoomingListsModule],
  providers: [DataImportService],
  controllers: [DataImportController],
})
export class DataImportModule {}
