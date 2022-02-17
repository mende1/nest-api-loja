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

    return this.customerRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Order | Error> {
    const order = await this.customerRepository.findOne(id);

    if (!order) {
      return new Error('Order not found.');
    }

    return order;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.customerRepository.delete(id);
  }
}
