import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { RoomingListsService } from './rooming-lists.service';

@Controller('rooming-lists')
export class RoomingListsController {
  constructor(private readonly roomingListService: RoomingListsService) {}

  @Get()
  findAll(
    @Query('query') query: string,
    @Query(
      'status',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    status: string[],
  ) {
    return this.roomingListService.findAll(query, status);
  }

  @Get('/:roomingListId/bookings')
  async findByRoomingListId(@Param() params: { roomingListId: number }) {
    return await this.roomingListService.findBookings(params.roomingListId);
  }
}
