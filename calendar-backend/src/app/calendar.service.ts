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
    const start = new Date(payload.start);
    const end = new Date(payload.end);

    const hasConflict = await this.calendarEventRepository.hasConflict(
      start,
      end,
    );
    if (hasConflict) {
      throw new BadRequestException(
        'Event conflicts with another existing event.',
      );
    }

    const newEntity = await this.calendarEventRepository.createNewEvent(
      payload.name,
      start,
      end,
    );

    return newEntity.id;
  }

  async updateEvent(id: number, payload: EventPayload): Promise<void> {
    const start = new Date(payload.start);
    const end = new Date(payload.end);

    const hasConflict = await this.calendarEventRepository.hasConflict(
      start,
      end,
      id,
    );
    if (hasConflict) {
      throw new BadRequestException(
        'Event conflicts with another existing event.',
      );
    }

    await this.calendarEventRepository.updateEventById(id, {
      name: payload.name,
      start,
      end,
    });
  }

  async deleteEvent(id: number) {
    await this.calendarEventRepository.deleteById(id);
  }
}
