/* eslint-disable @typescript-eslint/no-empty-function */
import { IQuery } from '@nestjs/cqrs';

export class GetPurchasesQuery implements IQuery {
  constructor() {}
}
