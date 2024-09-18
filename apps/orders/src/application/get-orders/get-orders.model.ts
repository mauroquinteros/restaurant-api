import { format } from 'date-fns';
import { Order } from './get-orders.response.query';

export class OrdersReadModel {
  private orders: Order[];

  constructor(orders: any) {
    this.orders = orders.map((order: any) => this.formatResponse(order));
  }

  private formatResponse(order: any): Order {
    const createdAt = format(order.createdAt, 'dd-MM-yyyy HH:mm:ss');
    return new Order(order._id, order.quantity, order.state, order.recipes, createdAt);
  }

  public toResponse(): Order[] {
    return this.orders;
  }
}
