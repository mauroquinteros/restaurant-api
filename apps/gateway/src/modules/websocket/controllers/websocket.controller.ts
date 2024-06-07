import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppWebSocketGateway } from '../websocket.gateway';
import { WebSocketService } from '../websocket.service';

@Controller()
export class WebSocketController {
  constructor(
    private service: WebSocketService,
    @Inject(AppWebSocketGateway)
    private readonly wsGateway: AppWebSocketGateway,
  ) {}

  @EventPattern('created_order')
  async handleCreatedOrderEvent(order: any) {
    if (!order) return;
    if (!order._id) return;

    const orders = await this.service.getOrders();
    this.wsGateway.server.emit('get_orders', orders);
  }

  @EventPattern('preparing_order')
  async handlePreparingOrderEvent(order: any) {
    if (!order) return;
    if (!order._id) return;

    const orders = await this.service.getOrders();
    this.wsGateway.server.emit('get_orders', orders);
  }

  @EventPattern('prepared_order')
  async handlePreparedOrderEvent(order: any) {
    if (!order) return;
    if (!order._id) return;

    const orders = await this.service.getOrders();
    this.wsGateway.server.emit('get_orders', orders);
  }
}
