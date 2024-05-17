class Recipes {
  constructor(readonly id: string, readonly name: string) {}
}

export class UpdateStockEvent {
  constructor(readonly orderId: string, readonly recipes: Recipes[]) {}
}
