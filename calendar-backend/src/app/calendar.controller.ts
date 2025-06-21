import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
} from '@nestjs/common';

import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('date-range')
  async getEvents(@Query('start') start: string, @Query('end') end: string) {
    return this.calendarService.getEvents(start, end);
  }

  @Post('create-event')
  async createEvent(@Body() payload: EventPayload) {
    const id = await this.calendarService.addEvent(payload);
    return { message: 'Event created', id };
  }

  @Patch('update-event/:id')
  async updateEvent(@Param('id') id: number, @Body() payload: EventPayload) {
    await this.calendarService.updateEvent(id, payload);
    return { message: 'Event updated', id };
  }

  @Delete('delete-event/:id')
  async deleteEvent(@Param('id') id: number) {
    await this.calendarService.deleteEvent(id);
    return { message: 'Event deleted', id };
  }
}
