// src/common/adapters/redis-io.adapter.ts
import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient, RedisClientType } from 'redis'; // O 'ioredis'

export class RedisIoAdapter extends IoAdapter {
  constructor(
    app: INestApplication, // NestJS pasa la instancia de la aplicación
    private readonly pubClient: RedisClientType, // Cliente publicador de Redis (ya conectado)
    private readonly subClient: RedisClientType, // Cliente suscriptor de Redis (ya conectado)
  ) {
    super(app);
  }

  // Este método SOBREESCRIBE la forma en que NestJS crea el servidor de Socket.IO
  // Aquí es donde inyectamos el adaptador de Redis
  createIOServer(port: number, options?: any) {
    // Llama al método del padre (IoAdapter) para crear la instancia base del servidor de Socket.IO.
    const server = super.createIOServer(port, options);

    // Aplica el adaptador de Redis (usando los clientes ya conectados) al servidor de Socket.IO.
    // Esto permite que el servidor de Socket.IO maneje la comunicación entre múltiples instancias
    // de tu aplicación a través de Redis.
    server.adapter(createAdapter(this.pubClient, this.subClient));

    return server;
  }

  // Opcional: Cerrar clientes Redis al apagar la aplicación
  closeClients() {
    this.pubClient?.quit();
    this.subClient?.quit();
  }
}
