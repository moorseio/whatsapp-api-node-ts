import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import Menu from '../../models/Menu';

class SeedItems implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Menu)
      .values([
        {name: 'INICIAL', initial: true},
        {name: 'SABORES', initial: false},
        {name: 'MASSAS', initial: false},
        {name: 'ADICIONAIS', initial: false},
      ])
      .execute();
  }
}
export default SeedItems;
