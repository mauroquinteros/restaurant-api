import { ICommand } from '@nestjs/cqrs';

export class UpdateOrderStatusCommand implements ICommand {
  constructor(readonly orderId: string) {}
}
