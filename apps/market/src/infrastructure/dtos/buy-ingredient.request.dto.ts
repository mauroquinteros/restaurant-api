import { IsString } from 'class-validator';

export class BuyIngredientRequestBody {
  @IsString()
  readonly ingredient: string;
}
