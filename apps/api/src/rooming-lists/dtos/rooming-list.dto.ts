import { RoomingListByEventNameSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class RoomingListsByEventNameDto extends createZodDto(
  RoomingListByEventNameSchema,
) {}
