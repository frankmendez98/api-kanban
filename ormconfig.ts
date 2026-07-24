import { DataSource, DataSourceOptions } from 'typeorm'; // Importa DataSource
import * as dotenv from 'dotenv';
import * as path from 'path';

// Determina el nombre del archivo .env a cargar
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// --------------------------------------------------------------------

function getEnvVar(key: string): string {
  const value = process.env[key];
  // throw new Error(`dirname: ${__dirname}`);
  if (value === undefined) {
    throw new Error(
      `La variable de entorno ${key} no está definida. Verifica tu archivo .env en: ${envPath}`,
    );
  }
  return value;
}

// Define tus opciones de DataSource (esencialmente lo que ya tenías)
const dataSourceOptions: DataSourceOptions = {
  type: getEnvVar('DATABASE_TYPE') as 'postgres',
  host: getEnvVar('DATABASE_HOST'),
  port: parseInt(getEnvVar('DATABASE_PORT'), 10),
  username: getEnvVar('DATABASE_USERNAME'),
  password: getEnvVar('DATABASE_PASSWORD'),
  database: getEnvVar('DATABASE_NAME'),
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/src/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: true,
};

// Crea y exporta una instancia de DataSource
const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource; // <--- ¡Exporta la instancia de DataSource!
