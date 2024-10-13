import { BadRequestException, Injectable } from '@nestjs/common';
import { CalendarEventRepository } from '@fs-tech-test/calendar-domain';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarEventRepository: CalendarEventRepository,
  ) {}

  async getEvents(start: string, end: string) {
    if (!start || !end) throw new BadRequestException('No start/end specified');

    return this.calendarEventRepository.findForRange(
      new Date(start),
      new Date(end),
    );
  }

  async addEvent(payload: EventPayload) {
    const newEntity = await this.calendarEventRepository.createNewEvent(
      payload.name,
      new Date(payload.start),
      new Date(payload.end),
    );

    return newEntity.id;
  }

  async deleteEvent(id: number) {
    await this.calendarEventRepository.deleteById(id);
  }
}
