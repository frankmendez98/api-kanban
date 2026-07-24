import { Seeder } from './seed.types';
import { EstadosSeeder } from './seeders/estados.seeder';

export const SEEDERS: Seeder[] = [new EstadosSeeder()].sort(
  (a, b) => a.order - b.order,
);
