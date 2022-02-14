import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
