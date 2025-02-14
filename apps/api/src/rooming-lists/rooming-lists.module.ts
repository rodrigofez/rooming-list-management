import { Module } from '@nestjs/common';
import { RoomingListsController } from './rooming-lists.controller';
import { RoomingListsService } from './rooming-lists.service';
import { RoomingListRepository } from './repositories/rooming-list.repository';
import { BookingsModule } from 'src/bookings/bookings.module';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule, BookingsModule],
  controllers: [RoomingListsController],
  providers: [RoomingListsService, RoomingListRepository],
  exports: [RoomingListRepository],
})
export class RoomingListsModule {}
