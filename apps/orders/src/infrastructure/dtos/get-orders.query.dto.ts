import { IsBoolean, IsOptional } from 'class-validator';

export class GetOrdersQueryBody {
  @IsOptional()
  @IsBoolean()
  readonly fullList?: boolean;
}
