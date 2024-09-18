import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { GetOrdersQuery } from '../../application/get-orders';
import { SaveOrderCommand } from '../../application/save-order';
import { UpdateOrderStatusCommand } from '../../application/update-order-status';
import { GetOrdersQueryBody } from '../dtos/get-orders.query.dto';
import { SaveOrderRequestBody } from '../dtos/save-order.request.dto';
import { UpdateOrderStatusRequestBody } from '../dtos/update-order-status.request.dto';

@Controller()
export class OrderController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'get_orders' })
  async getOrders(query: GetOrdersQueryBody): Promise<any> {
    return this.queryBus.execute(new GetOrdersQuery(query?.fullList));
  }

  @MessagePattern({ cmd: 'save_order' })
  async saveOrder(@Body() body: SaveOrderRequestBody) {
    return this.commandBus.execute(new SaveOrderCommand(body.quantity, body.status));
  }

  @EventPattern('update_order_status')
  async updateOrderStatus(@Body() body: UpdateOrderStatusRequestBody) {
    this.commandBus.execute(new UpdateOrderStatusCommand(body.orderId));
  }
}
