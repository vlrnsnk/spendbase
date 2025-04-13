import { DataSource } from 'typeorm';
import { Weather } from './modules/weather/entities/weather.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'spendbase',
  entities: [Weather],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: true,
});
