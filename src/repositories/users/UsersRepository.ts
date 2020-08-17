import {EntityRepository, Repository} from 'typeorm';

import User from '../../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByUser(number: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: {number},
    });

    return findUser || null;
  }
}
export default UsersRepository;
