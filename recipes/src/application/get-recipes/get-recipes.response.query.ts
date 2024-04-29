class Ingredients {
  constructor(readonly name: string, readonly quantity: number) {}
}

export class GetRecipesResponse {
  constructor(readonly name: string, readonly ingredients: Ingredients[]) {}
}
