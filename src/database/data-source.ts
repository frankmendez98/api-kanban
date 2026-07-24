import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: must('DATABASE_HOST'),
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: must('DATABASE_USERNAME'),
  password: must('DATABASE_PASSWORD'),
  database: must('DATABASE_NAME'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
});
