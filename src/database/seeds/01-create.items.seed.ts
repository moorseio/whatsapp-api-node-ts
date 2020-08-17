import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import Item from '../../models/Item';

class SeedItems implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Item)
      .values([
        {name: 'Para escolher sua pizza', menuId: 1, type: 'MENU', position: 1},
        {
          name: 'Para escolher o tipo de massa',
          menuId: 1,
          type: 'MENU',
          position: 2,
        },
        {
          name: 'Para escolher os adicionais',
          menuId: 1,
          type: 'MENU',
          position: 3,
        },
        {name: 'Finalizar Pedido ', menuId: 1, type: 'MENU', position: 4},
        {name: '🍗 Frango', menuId: 2, type: 'ITEM', position: 5},
        {name: '🥩 Calabresa', menuId: 2, type: 'ITEM', position: 6},
        {name: '🍳 Portuguesa', menuId: 2, type: 'ITEM', position: 7},
        {name: '🥖 Fina', menuId: 3, type: 'ITEM', position: 8},
        {name: '🍞 Grossa', menuId: 3, type: 'ITEM', position: 9},
        {name: '🍫 Recheada', menuId: 3, type: 'ITEM', position: 10},
        {name: '🥓 Bacon', menuId: 4, type: 'ITEM', position: 11},
        {name: '🧀 Queijo', menuId: 4, type: 'ITEM', position: 12},
        {name: '🥗 Legumes', menuId: 4, type: 'ITEM', position: 13},
      ])
      .execute();
  }
}
export default SeedItems;
