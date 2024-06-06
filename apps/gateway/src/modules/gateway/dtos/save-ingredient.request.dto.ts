import { IsNumber, IsString } from 'class-validator';

export class SaveIngredientRequestBody {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly stock: number;
}
