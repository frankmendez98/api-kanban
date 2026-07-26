import { Module, Global, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import Redlock from 'redlock'; // 👈 Importamos Redlock

// Tokens de Inyección
export const REDIS_CLIENT = 'REDIS_CLIENT';
export const REDLOCK_CLIENT = 'REDLOCK_CLIENT'; // 👈 Nuevo Token para Redlock

// Clase que maneja el cierre de la conexión (Auxiliar)
class RedisClientProvider implements OnModuleDestroy {
  private client: Redis;

  constructor(configService: ConfigService) {
    // ... (la lógica de inicialización del cliente Redis sigue igual) ...
    this.client = new Redis({
      host: configService.get<string>('REDIS_HOST', 'api-redis'),
      port: configService.get<number>('REDIS_PORT', 6379),
      db: 1,
    });

    this.client.on('error', (err) => {
      console.error('Error del cliente Redis:', err);
    });

    console.log('Cliente Redis inicializado.');
  }

  getClient(): Redis {
    return this.client;
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.quit();
      console.log('Cliente Redis desconectado (por RedisModule).');
    }
  }
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    // 1. Proveedor de la instancia de Redis
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        // Usamos la clase auxiliar para inicializar y obtener el cliente
        return new RedisClientProvider(configService).getClient();
      },
      inject: [ConfigService],
    },
    // 2. Proveedor de la instancia de Redlock
    {
      provide: REDLOCK_CLIENT,
      useFactory: (redisClient: Redis) => {
        return new Redlock(
          [redisClient], // Le pasamos el cliente Redis inyectado
          {
            driftFactor: 0.01,
            retryCount: 10,
            retryDelay: 200,
          },
        );
      },
      inject: [REDIS_CLIENT], // Inyectamos el cliente Redis
    },
    // 3. Proveedor auxiliar para el ciclo de vida de Redis
    {
      provide: RedisClientProvider,
      useFactory: (configService: ConfigService) =>
        new RedisClientProvider(configService),
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT, REDLOCK_CLIENT], // 👈 Exportamos ambos tokens
})
export class RedisModule {}
