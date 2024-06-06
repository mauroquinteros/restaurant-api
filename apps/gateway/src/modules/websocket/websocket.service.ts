import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export class WebSocketService {
  constructor(@Inject('ORDERS_SERVICE') private orderClient: ClientProxy) {}

  async getOrders() {
    const orders = await lastValueFrom(
      this.orderClient.send({ cmd: 'get_orders' }, {}),
    );

    return orders;
  }
}
