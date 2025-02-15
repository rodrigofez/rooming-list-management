import { BookingSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class BookingDto extends createZodDto(BookingSchema) {}
