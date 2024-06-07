import { IsString } from 'class-validator';

export class UpdateOrderStatusRequestBody {
  @IsString()
  readonly orderId: string;
}
