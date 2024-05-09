import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { SaveOrderCommand } from '../../../application/save-order';
import { SaveOrderDTO } from '../dtos';

@Controller()
export class OrderController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'save_order' })
  async saveOrder(@Body() body: SaveOrderDTO.RequestBody) {
    return this.commandBus.execute(new SaveOrderCommand(body.quantity, body.status));
  }
}
