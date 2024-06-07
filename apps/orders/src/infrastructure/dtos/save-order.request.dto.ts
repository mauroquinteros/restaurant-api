import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Status } from '../../domain/enums';

export class SaveOrderRequestBody {
  @IsNumber()
  readonly quantity: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status = Status.requested;
}
