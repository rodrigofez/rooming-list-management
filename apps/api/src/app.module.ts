import { Module } from '@nestjs/common';

import { RoomingListsModule } from './rooming-lists/rooming-lists.module';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';
import { DataImportModule } from './data-import/data-import.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoomingListsModule,
    BookingsModule,
    DataImportModule,
  ],
})
export class AppModule {}
