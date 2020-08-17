import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import User from './User';
import Item from './Item';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User)
  @JoinColumn({name: 'users_id'})
  usersId: number;

  @ManyToMany((type) => Item, (items) => items.products, {cascade: true})
  @JoinTable({
    name: 'products_items',
    joinColumn: {
      name: 'products_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'items_id',
      referencedColumnName: 'id',
    },
  })
  items: Item[];

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Product;
