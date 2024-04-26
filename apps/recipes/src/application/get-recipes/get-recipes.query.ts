/* eslint-disable @typescript-eslint/no-empty-function */
import { IQuery } from '@nestjs/cqrs';

export class GetRecipesQuery implements IQuery {
  constructor() {}
}
