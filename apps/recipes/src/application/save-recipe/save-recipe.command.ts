class RecipeDetail {
  constructor(readonly name: string, readonly quantity: number) {}
}

export class Command {
  constructor(readonly name: string, readonly ingredients: RecipeDetail[]) {}
}
