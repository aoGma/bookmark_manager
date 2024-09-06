import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const ENV = process.env.NODE_ENV;
const configObj: any = {};

config({
  path: [!ENV ? 'config/dev.env' : `config/${ENV}.env`, 'config/local.env'],
  processEnv: configObj,
});

const options: DataSourceOptions = {
  type: 'mysql',
  host: configObj.DATABASE_HOST || '127.0.0.1',
  port: +configObj.DATABASE_PORT || 3306,
  username: configObj.DATABASE_USER,
  password: configObj.DATABASE_PASSWORD,
  database: configObj.DATABASE_NAME,
  synchronize: false,
  entities: ['src/**/entities/*.entity{.js,.ts}'],
  migrations: ['src/migrations/*{.js,.ts}'],
  subscribers: ['src/subscribers/*{.js,.ts}'],
};

export default new DataSource(options);
