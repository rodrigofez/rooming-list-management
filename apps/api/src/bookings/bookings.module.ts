import { Module } from '@nestjs/common';
import { BookingsRepository } from './repositories/bookings.repository';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [BookingsRepository],
  exports: [BookingsRepository],
})
export class BookingsModule {}
