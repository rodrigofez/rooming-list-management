import { Module } from '@nestjs/common';

import { RoomingListsModule } from './rooming-lists/rooming-lists.module';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';
import { DataImportModule } from './data-import/data-import.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoomingListsModule,
    BookingsModule,
    DataImportModule,
  ],
})
export class AppModule {}
