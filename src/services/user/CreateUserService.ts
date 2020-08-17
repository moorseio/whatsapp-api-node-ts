import {getCustomRepository} from 'typeorm';

import {messages} from '../../config/constants';
import ICreateUserDTO from '../../web/dtos/ICreateUserDTO';
import UsersRepository from '../../repositories/users/UsersRepository';

class CreateUserService {
  public async execute({
    name,
    number,
  }: Omit<ICreateUserDTO, 'id'>): Promise<ICreateUserDTO> {
    const user = getCustomRepository(UsersRepository);

    try {
      const findUserInDB = await user.findByUser(number);
      if (!findUserInDB) {
        const userInfo = user.create({
          name,
          number,
        });
        const createdUser = await user.save(userInfo);

        return createdUser;
      }

      return findUserInDB;
    } catch (err) {
      console.error(err);
      throw new Error(messages.error.createUser);
    }
  }
}
export default CreateUserService;
