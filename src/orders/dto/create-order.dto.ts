import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  quantity: number;
}
