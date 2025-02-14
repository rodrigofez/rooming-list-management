import { Module } from '@nestjs/common';

import { RoomingListsModule } from './rooming-lists/rooming-lists.module';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoomingListsModule,
    BookingsModule,
  ],
})
export class AppModule {}
