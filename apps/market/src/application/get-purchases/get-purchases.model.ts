import { format } from 'date-fns';

export class Purchase {
  constructor(
    readonly id: string,
    readonly ingredient: string,
    readonly quantity: number,
    readonly createdAt: string,
  ) {}
}

export class PurchasesReadModel {
  private purchases: Purchase[];

  constructor(purchases: any) {
    this.purchases = purchases.map((purchase: any) => this.formatResponse(purchase));
  }

  private formatResponse(purchase: any): Purchase {
    const createdAt = format(purchase.createdAt, 'dd-MM-yyyy HH:mm:ss');
    return new Purchase(purchase._id, purchase.ingredient, purchase.quantity, createdAt);
  }

  public toResponse(): Purchase[] {
    return this.purchases;
  }
}
