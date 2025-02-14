import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomingListsModule } from './rooming-lists/rooming-lists.module';

@Module({
  imports: [DatabaseModule, BookingsModule, RoomingListsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
