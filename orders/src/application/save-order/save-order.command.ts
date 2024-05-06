import { ICommand } from '@nestjs/cqrs';
import { Status } from '../../domain/enums';

export class SaveOrderCommand implements ICommand {
  constructor(readonly quantity: number, readonly status: Status) {}
}
