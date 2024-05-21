import { ICommand } from '@nestjs/cqrs';

class Recipes {
  constructor(readonly id: string, readonly name: string) {}
}

export class UpdateStockCommand implements ICommand {
  constructor(readonly orderId: string, readonly recipes: Recipes[]) {}
}
