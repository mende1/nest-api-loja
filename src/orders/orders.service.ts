import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private customerRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.customerRepository.create(createOrderDto);

    return await this.customerRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return await this.customerRepository.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.customerRepository.delete(id);
  }
}
