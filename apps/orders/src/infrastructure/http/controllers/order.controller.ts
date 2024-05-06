import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveOrderCommand } from '../../../application/save-order';
import { SaveOrderDTO } from '../dtos';

@Controller('orders')
export class OrderController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @Post()
  async saveOrder(@Body() body: SaveOrderDTO.RequestBody) {
    return this.commandBus.execute(new SaveOrderCommand(body.quantity, body.status));
  }
}
