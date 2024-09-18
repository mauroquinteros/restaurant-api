import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GetOrdersQuery } from '../dtos/get-orders.query.dto';
import { SaveOrderRequestBody } from '../dtos/save-order.request.dto';

@Controller('orders')
export class OrderController {
  constructor(@Inject('ORDERS_SERVICE') private client: ClientProxy) {}

  @Get()
  async getOrders(@Query() query: GetOrdersQuery) {
    const orders = await lastValueFrom(
      this.client.send({ cmd: 'get_orders' }, query),
    );
    return orders;
  }

  @Post()
  async saveOrder(@Body() body: SaveOrderRequestBody) {
    const newOrder = await lastValueFrom(
      this.client.send({ cmd: 'save_order' }, body),
    );
    return newOrder;
  }
}
