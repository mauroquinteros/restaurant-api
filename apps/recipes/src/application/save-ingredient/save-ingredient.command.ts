import { ICommand } from '@nestjs/cqrs';

export class SaveIngredientCommand implements ICommand {
  constructor(readonly name: string, readonly stock: number) {}
}
