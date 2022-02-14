import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { DeleteResult } from 'typeorm';
import { OrdersService } from './orders.service';
import { ProductsService } from 'src/products/products.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order | string> {
    const productId = createOrderDto.productId;
    const product = await this.productsService.findOne(productId);

    if (product instanceof Error) {
      return product.message;
    }

    const currentStock = product.quantity;
    const requestedStock = createOrderDto.quantity;

    if (requestedStock > currentStock) {
      return new Error('There is not enough stock for this product.').message;
    }

    const updatedStock = currentStock - requestedStock;

    await this.productsService.update(productId, updatedStock);

    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.ordersService.delete(id);
  }
}
