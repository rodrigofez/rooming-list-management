import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { RoomingListsService } from './rooming-lists.service';
import { ZodSerializerDto } from 'nestjs-zod';
import { RoomingListsByEventNameDto } from './dtos/rooming-list.dto';
import { BookingDto } from 'src/bookings/dto/bookings.dto';

@Controller('rooming-lists')
export class RoomingListsController {
  constructor(private readonly roomingListService: RoomingListsService) {}

  @Get()
  @ZodSerializerDto(RoomingListsByEventNameDto)
  async findAll(
    @Query('query') query: string,
    @Query(
      'status',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    status: string[],
  ) {
    return await this.roomingListService.findAll(query, status);
  }

  @Get('/:roomingListId/bookings')
  @ZodSerializerDto(BookingDto)
  async findByRoomingListId(@Param() params: { roomingListId: number }) {
    return await this.roomingListService.findBookings(params.roomingListId);
  }
}
