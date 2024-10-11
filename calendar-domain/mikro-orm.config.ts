import { entities } from './src/lib/entities';

export default {
  entities: entities,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  type: 'mysql',
};
