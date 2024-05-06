import { ICommand } from '@nestjs/cqrs';

class Ingredients {
  constructor(readonly name: string, readonly quantity: number) {}
}

export class SaveRecipeCommand implements ICommand {
  constructor(readonly name: string, readonly ingredients: Ingredients[]) {}
}
