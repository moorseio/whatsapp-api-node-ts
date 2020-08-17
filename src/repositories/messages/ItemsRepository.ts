import {EntityRepository, Repository} from 'typeorm';

import Item from '../../models/Item';

@EntityRepository(Item)
class ItemsRepository extends Repository<Item> {
  public async findByItem(item: string): Promise<Item | null> {
    const findItem = await this.findOne({
      where: {name: item},
    });

    return findItem || null;
  }
}
export default ItemsRepository;
