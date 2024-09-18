/* eslint-disable @typescript-eslint/no-empty-function */
import { IQuery } from '@nestjs/cqrs';

export class GetOrdersQuery implements IQuery {
  constructor(public readonly fullList?: boolean) {}
}
