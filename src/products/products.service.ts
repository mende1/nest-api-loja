import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product | Error> {
    const product = this.productRepository.findOne(id);

    if (!product) {
      return new Error('Product not found.');
    }

    return await this.productRepository.findOne(id);
  }

  async update(id: string, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    product.quantity = quantity;

    return await this.productRepository.save(product);
  }
}
