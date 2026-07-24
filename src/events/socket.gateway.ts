// src/events/events.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // Importa Server y Socket de 'socket.io'
import { Logger } from '@nestjs/common';

// @WebSocketGateway() sin argumentos, por defecto escucha en el puerto 3000 de la misma app
// Si quieres un puerto diferente o CORS, usa:
@WebSocketGateway({
  cors: {
    origin: '*', // Permite todas las origenes. ¡Ajusta esto en producción!
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
})
export class SocketsGateway {
  @WebSocketServer() // Decora una propiedad para acceder a la instancia del servidor de Socket.IO
  server: Server;

  private logger: Logger = new Logger('SocketsGateway');

  // Este método se ejecuta cuando un cliente se conecta
  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway inicializado');
  }

  // Este método se ejecuta cuando un cliente se conecta
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    // Puedes emitir un evento solo a este cliente
    client.emit('connectionConfirmed', `Bienvenido, tu ID es: ${client.id}`);
  }

  // Este método se ejecuta cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // @SubscribeMessage() define un "listener" para un evento específico del cliente
  // Cuando un cliente emite 'msgToServer', este método se ejecuta.
  @SubscribeMessage('msgToServer')
  handleMessage(
    @MessageBody() payload: string, // El cuerpo del mensaje enviado por el cliente
    @ConnectedSocket() client: Socket, // La instancia del socket del cliente que envió el mensaje
  ): void {
    this.logger.log(`Mensaje recibido de ${client.id}: ${payload}`);
    // Puedes emitir un mensaje de vuelta al mismo cliente
    client.emit('msgToClient', `Has enviado: "${payload}"`);

    // O puedes emitir el mensaje a todos los clientes conectados (broadcast)
    this.server.emit('msgToAll', `[${client.id}] dice: ${payload}`);
  }

  // Otro ejemplo: unirse a una sala
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(room);
    this.logger.log(`${client.id} se ha unido a la sala: ${room}`);
    // Informar a la sala que alguien se unió (excepto al que se unió)
    client.to(room).emit('roomJoined', `${client.id} se ha unido a ${room}`);
    // O emitir a todos en la sala, incluyendo al que se unió
    // this.server.to(room).emit('roomJoined', `${client.id} se ha unido a ${room}`);
  }

  // Ejemplo de mensaje a una sala específica
  @SubscribeMessage('msgToRoom')
  handleMessageToRoom(
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(
      `Mensaje de ${client.id} para sala ${data.room}: ${data.message}`,
    );
    // Envía el mensaje solo a los clientes en la sala especificada (excluyendo al emisor)
    client
      .to(data.room)
      .emit('msgFromRoom', `[${client.id} en ${data.room}]: ${data.message}`);
  }
}
