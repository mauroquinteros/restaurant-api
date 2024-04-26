import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class SaveRecipeDetailRequestBody {
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
  @Type(() => SaveRecipeDetailRequestBody)
  readonly ingredients: SaveRecipeDetailRequestBody[];
}
