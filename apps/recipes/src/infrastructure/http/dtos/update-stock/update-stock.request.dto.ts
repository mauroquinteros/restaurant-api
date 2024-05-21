import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class RecipeRequestBody {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;
}

export class UpdateStockRequestBody {
  @IsString()
  readonly orderId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeRequestBody)
  readonly recipes: RecipeRequestBody[];
}
