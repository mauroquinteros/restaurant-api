import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum Status {
  requested = 'requested',
  preparing = 'preparing',
  prepared = 'prepared',
}

export class SaveOrderRequestBody {
  @IsNumber()
  readonly quantity: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status = Status.requested;
}
