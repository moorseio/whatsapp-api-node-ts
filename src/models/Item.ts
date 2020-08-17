import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import Menu from './Menu';
import Product from './Product';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => Menu)
  @JoinColumn({name: 'menu_id'})
  menuId: number;

  @Column()
  type: string;

  @Column()
  position: number;

  @ManyToMany((type) => Product, (product) => product.items)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Item;
