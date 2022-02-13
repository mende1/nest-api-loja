import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  userId: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
