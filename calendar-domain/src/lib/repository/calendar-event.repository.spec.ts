import { LoadStrategy, MikroORM, wrap } from '@mikro-orm/core';
import { entities } from '@fs-tech-test/calendar-domain';
import { EntityManager, MySqlDriver } from '@mikro-orm/mysql';
import { CalendarEventEntity } from '../entity/calendar-event.entity';

describe('CalendarEventRepository', () => {
  let orm: MikroORM;
  let em: EntityManager;
  const now = new Date('2024-10-01T13:33:00Z');

  beforeAll(async () => {
    process.env.MIKRO_ORM_DB_NAME = 'test';
    const orm = await MikroORM.init<MySqlDriver>({
      type: 'sqlite',
      dbName: ':memory:',
      entities,
      loadStrategy: LoadStrategy.JOINED,
    });
    await orm.getSchemaGenerator().refreshDatabase();
    em = orm.em.fork();
    jest.useFakeTimers().setSystemTime(now);
  });

  afterAll(async () => {
    await orm.close(true);
    jest.useRealTimers();
  });

  describe('CalendarEventEntity', () => {
    it('can be persisted, deleted and fetched', async () => {
      // Create
      const eventData = {name: 'test event', start: new Date('2024-11-14T10:00:00'), end: new Date('2024-11-14T11:00:00')};
      const entity = em.create(CalendarEventEntity, eventData);
      await em.persistAndFlush(entity);

      // Fetch
      const result = await em.find(CalendarEventEntity, {});
      expect(result.map(r => wrap(r).toObject())).toEqual([{...eventData, id: 1, createdAt: now}]);

      // Remove
      em.remove(result[0]);
      await em.flush();
      await expect(em.find(CalendarEventEntity, {})).resolves.toEqual([]);
    });
  });

  describe('findForRange', () => {
    it.skip('should find events for a date range', async () => {

    });
  });

  describe('createNewEvent', () => {
    it.skip('should create a new event', async () => {

    });
  });

  describe('deleteById', () => {
    it.skip('should delete by id', async () => {

    });
  });
});
