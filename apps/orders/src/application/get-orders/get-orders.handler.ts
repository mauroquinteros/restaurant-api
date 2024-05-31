import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../infrastructure/persistence/schemas';
import { OrderReadModel } from './get-orders.model';
import { GetOrdersQuery } from './get-orders.query';
import { GetOrdersResponse } from './get-orders.response.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery, GetOrdersResponse> {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async execute(): Promise<GetOrdersResponse> {
    const orders = await this.orderModel.find().exec();

    if (!orders) {
      throw new Error('Orders not found');
    }

    const ordersGroupByState = new OrderReadModel(orders);
    return ordersGroupByState.toResponse();
  }
}
