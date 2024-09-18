import { IsBoolean, IsOptional } from 'class-validator';

export class GetOrdersQuery {
  @IsOptional()
  @IsBoolean()
  readonly fullList?: boolean;
}
