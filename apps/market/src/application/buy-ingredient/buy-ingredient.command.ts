import { ICommand } from '@nestjs/cqrs';

export class BuyIngredientCommand implements ICommand {
  constructor(readonly ingredient: string) {}
}
