import { DataSource } from 'typeorm';

export type SeedName = string;

export interface Seeder {
  /** nombre único para CLI: roles, users, catalogs... */
  name: SeedName;

  /** orden global cuando ejecutas runAll */
  order: number;

  /** ejecuta el seeder */
  run(dataSource: DataSource): Promise<void>;
}
