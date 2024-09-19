import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Market } from '../../persistence/schemas';
import { PurchasesReadModel } from './get-purchases.model';
import { GetPurchasesQuery } from './get-purchases.query';

@QueryHandler(GetPurchasesQuery)
export class GetPurchasesHandler implements IQueryHandler<GetPurchasesQuery> {
  constructor(@InjectModel(Market.name) private marketModel: Model<Market>) {}

  async execute(): Promise<any> {
    const ingredients = await this.marketModel.find().exec();
    const data = new PurchasesReadModel(ingredients);
    return data.toResponse();
  }
}
