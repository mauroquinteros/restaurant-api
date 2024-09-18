import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../persistence/schemas';
import { GroupedOrdersReadModel } from './get-grouped-orders.model';
import { OrdersReadModel } from './get-orders.model';
import { GetOrdersQuery } from './get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery, any> {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async execute(query: GetOrdersQuery): Promise<any> {
    const orders = await this.orderModel.find().exec();

    if (!orders) {
      throw new Error('Orders not found');
    }

    if (query.fullList) {
      const data = new OrdersReadModel(orders);
      return data.toResponse();
    }

    const ordersGroupByState = new GroupedOrdersReadModel(orders);
    return ordersGroupByState.toResponse();
  }
}
