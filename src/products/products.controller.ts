import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | string> {
    const product = await this.productsService.findOne(id);

    if (product instanceof Error) {
      return product.message;
    }

    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | string> {
    const product = await this.productsService.findOne(id);

    if (product instanceof Error) {
      return product.message;
    }

    const currentStock = product.quantity;
    const requestedStock = updateProductDto.quantity;

    if (requestedStock > currentStock) {
      return new Error('There is not enough stock for this product.').message;
    }

    const updatedStock = currentStock - requestedStock;

    return this.productsService.update(id, updatedStock);
  }
}
