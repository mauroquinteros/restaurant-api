import { format } from 'date-fns';
import { Status } from '../../domain/enums';
import { GetOrdersResponse, Order } from './get-orders.response.query';

export class GroupedOrdersReadModel {
  private orders: Order[];

  constructor(orders: any) {
    this.orders = orders.map((order: any) => this.formatResponse(order));
  }

  private formatResponse(order: any): Order {
    const createdAt = format(order.createdAt, 'dd-MM-yyyy HH:mm:ss');
    return new Order(order._id, order.quantity, order.state, order.recipes, createdAt);
  }

  private groupListByKey(list: Order[], key: string) {
    return list.reduce((acc, item) => {
      acc[item[key]] = acc[item[key]] || [];
      acc[item[key]].push(item);
      return acc;
    }, {} as GetOrdersResponse);
  }

  public toResponse(): GetOrdersResponse {
    let groupedOrders = this.groupListByKey(this.orders, 'state');

    Object.values(Status).forEach((status) => {
      if (!(status in groupedOrders)) {
        groupedOrders = { ...groupedOrders, [status]: [] };
      }
    });
    return groupedOrders;
  }
}
