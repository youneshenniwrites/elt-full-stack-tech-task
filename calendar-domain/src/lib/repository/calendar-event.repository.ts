import { CalendarEventEntity } from '../entity/calendar-event.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarEventRepository extends EntityRepository<CalendarEventEntity> {
  async findForRange(start: Date, end: Date): Promise<CalendarEventEntity[]> {
    // By default, mikro-orm uses Knex query syntax but you can use raw queries like this if it's easier:
    // const rawResult = await this.em.getKnex().raw<CalendarEventEntity[][]>('select * from elt_event where start <= ? AND end >= ?', [end, start])
    // return rawResult[0];
    return this.find({ start: { $lte: end }, end: { $gte: start } });
  }

  async createNewEvent(
    name: string,
    start: Date,
    end: Date,
  ): Promise<CalendarEventEntity> {
    const newEntity = this.create({ name, start, end });
    await this.insert(newEntity);

    return newEntity;
  }

  async updateEventById(
    id: number,
    updateData: Partial<CalendarEventEntity>,
  ): Promise<void> {
    await this.nativeUpdate({ id }, updateData);
  }

  async deleteById(id: number): Promise<void> {
    await this.nativeDelete({ id });
  }

  async hasConflict(
    start: Date,
    end: Date,
    currentEventId?: number,
  ): Promise<boolean> {
    const overlapConditions: FilterQuery<CalendarEventEntity> = {
      start: { $lt: end },
      end: { $gt: start },
    };

    // Only check for conflicts with other events, not the one currently being edited
    if (currentEventId !== undefined) {
      overlapConditions.id = { $ne: currentEventId };
    }

    // Short-circuit on the first match
    const overlappingEvent = await this.findOne(overlapConditions);

    return !!overlappingEvent;
  }
}
