import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppWebSocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private service: WebSocketService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const orders = await this.service.getOrders();
    this.server.emit('get_orders', orders);
  }
}
