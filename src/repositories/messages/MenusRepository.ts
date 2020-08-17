import {EntityRepository, Repository} from 'typeorm';

import Menu from '../../models/Menu';

@EntityRepository(Menu)
class MenusRepository extends Repository<Menu> {
  public async findByMenu(menu: string): Promise<Menu | null> {
    const findMenu = await this.findOne({
      where: {name: menu},
    });

    return findMenu || null;
  }
}
export default MenusRepository;
