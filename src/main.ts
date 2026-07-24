import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedisIoAdapter } from './common/adapters/redis-io.adapter';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { join } from 'path';
import basicAuth from 'express-basic-auth';
import { Request, Response, NextFunction } from 'express';
async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // --- Configuración base ---
  const configService = app.get(ConfigService);

  const redisUrl =
    configService.get<string>('REDIS_URL') || 'redis://api-redis:6379';
  const frontendUrl =
    configService.get<string>('FRONTEND_URL') || 'http://localhost:4200';
  const hostCors =
    configService.get<string>('HOST_CORS') || '';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  const extraOrigins = hostCors
    ? hostCors.split(',').map(origin => origin.trim()).filter(Boolean)
    : [];
    const allowedOrigins = Array.from(new Set([frontendUrl, ...extraOrigins]));
  // --- Cookies ---
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser()); // necesario para leer req.cookies.rt
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // --- Archivos estáticos públicos (branding, logos, etc.) ---
  // 👇 NUEVO: estático desde /app/dist/storage/public
  const staticPath = join(__dirname, '..', 'storage', 'public');
  console.log('📁 Sirviendo estáticos desde:', staticPath);
  app.useStaticAssets(staticPath, {
    prefix: '/public/',
  });

  // --- CORS (solo necesario en producción, no en desarrollo con proxy Angular) ---
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Page-Size', 'X-Total-Pages'],

  });
  if (nodeEnv === 'production') {
    app.set('trust proxy', 1); // necesario si usas HTTPS tras proxy (Nginx, ALB, etc.)
  }

  // --- Conexión a Redis para WebSockets ---
  let pubClient: RedisClientType;
  let subClient: RedisClientType;
  try {
    console.log(`Intentando conectar Redis en: ${redisUrl}`);
    pubClient = createClient({ url: redisUrl }) as RedisClientType;
    subClient = pubClient.duplicate() as RedisClientType;

    pubClient.on('error', (err) =>
      console.error('Redis Publisher Error:', err),
    );
    subClient.on('error', (err) =>
      console.error('Redis Subscriber Error:', err),
    );

    await Promise.all([pubClient.connect(), subClient.connect()]);
    console.log('Clientes Redis conectados exitosamente en bootstrap.');
  } catch (err) {
    console.error('Error al conectar con Redis:', err);
    process.exit(1);
  }

  const redisIoAdapter = new RedisIoAdapter(app, pubClient, subClient);
  app.useWebSocketAdapter(redisIoAdapter);

  process.on('SIGTERM', () => {
    redisIoAdapter.closeClients();
    process.exit(0);
  });

  // --- Prefijo global ---
  app.setGlobalPrefix('api/v1');

  // --- 🔒 NUEVO: Middleware de Protección para Swagger ---
  // Extraemos las credenciales desde las variables de entorno de forma segura
  const swaggerUser = configService.get<string>('SWAGGER_USER') || 'admin';
  const swaggerPassword = configService.get<string>('SWAGGER_PASSWORD') || 'Firma365SecurePass!';

  // Inicializamos el middleware base de express-basic-auth
  const authMiddleware = basicAuth({
    challenge: true,
    users: {
      [swaggerUser]: swaggerPassword,
    },
  });

  // Envolvemos el middleware para inyectar cabeceras que destruyen la caché del navegador
  app.use(
    ['/api/v1/docs', '/api/v1/docs-json'], 
    (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
      
      // Ejecutamos la autenticación básica tras limpiar la caché de la petición
      authMiddleware(req, res, next);
    }
  );

  // --- Validación global ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        console.log('Validation Errors:', JSON.stringify(errors, null, 2));
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Errores de validación',
          errors: formattedErrors,
        });
      },
    }),
  );

  // --- Swagger ---
  const config = new DocumentBuilder()
    .setTitle('API Firma 365')
    .setDescription('Documentación de la API para el sistema de Firma 365')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingrese el token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(process?.env?.PORT || 3000);
  console.log(`🚀 Aplicación NestJS ejecutándose en: ${await app.getUrl()}`);
}
bootstrap();
