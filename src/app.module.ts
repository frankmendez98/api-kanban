import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { EstadoModule } from './modules/estados/estado.module';
import { ProyectoModule } from './modules/proyectos/proyecto.module';
import { TareaModule } from './modules/tareas/tarea.module';
import { RegistroTareaModule } from './modules/registros-tareas/registro-tarea.module';
import { SocketsGateway } from './events/socket.gateway';
import { EventsModule } from './modules/events/events.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      // <--- Configura ConfigModule aquí
      isGlobal: true, // Esto hace que ConfigService esté disponible en toda la aplicación sin necesidad de importarlo en cada módulo.
      envFilePath: `.env`, // Opcional: Para cargar archivos .env específicos por entorno
      // ignoreEnvFile: true, // Opcional: No leer .env files (útil en entornos de producción donde las variables se establecen externamente)
      // load: [configuration], // Opcional: Para cargar configuraciones más complejas desde un archivo de configuración
      // validationSchema: Joi.object({ ... }) // Opcional: Para validar tus variables de entorno con Joi
    }),
    TypeOrmModule.forRootAsync({
      // Configuración asíncrona de TypeORM
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      useFactory: (configService: ConfigService) => {
        const envLogging = configService.get<string>('DATABASE_LOGGING');
        const isLoggingEnabled = envLogging === 'true';
        return {
          type: configService.get<string>('DATABASE_TYPE') as 'postgres', // Asegúrate de que el tipo sea correcto
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // <--- Importante: Rutas a tus entidades
          synchronize: false, // ¡¡¡IMPORTANTE!!! NO USAR 'true' en producción.
          // 'false' significa que TypeORM NO sincronizará automáticamente tu BD.
          // Usaremos migraciones para esto.
          createDatabase: true,
          logging: isLoggingEnabled,
          extra: {
            // Esto asegura que la sesión de la DB use la zona correcta
            options: '-c timezone=America/El_Salvador',
          },
        }

      },
      inject: [ConfigService], // Inyecta ConfigService para que useFactory pueda acceder a él
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST') || 'api-redis',
          port: configService.get<number>('REDIS_PORT') || 6379,
          db: 0,
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(), // Habilita los Cron Jobs en NestJS
    EstadoModule,
    ProyectoModule,
    TareaModule,
    RegistroTareaModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE, // Esto hace que el ValidationPipe se aplique globalmente
    //   useClass: ValidationPipe,
    // },
  ],
  exports: [],
})
export class AppModule {}
