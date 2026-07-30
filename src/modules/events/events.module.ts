import { Module } from '@nestjs/common';
import { SocketsGateway } from 'src/events/socket.gateway';

@Module({
  providers: [SocketsGateway],
  exports: [SocketsGateway], // Lo exportamos para que otros módulos puedan inyectarlo
})
export class EventsModule {}