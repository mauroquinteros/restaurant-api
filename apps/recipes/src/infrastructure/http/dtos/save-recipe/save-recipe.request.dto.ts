import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class SaveRecipeIngredientsRequestBody {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly quantity: number;
}

export class SaveRecipeRequestBody {
  @IsString()
  readonly name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveRecipeIngredientsRequestBody)
  readonly ingredients: SaveRecipeIngredientsRequestBody[];
}
