import { Status } from '../../domain/enums';

export class Recipe {
  constructor(readonly id: string, readonly name: string) {}
}

export class Order {
  constructor(
    readonly id: string,
    readonly quantity: number,
    readonly state: Status,
    readonly recipes: Recipe[],
    readonly createdAt: string,
  ) {}
}

export class GetOrdersResponse {
  constructor(readonly requested: Order[], readonly preparing: Order[], readonly prepared: Order[]) {}
}
