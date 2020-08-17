import {getCustomRepository} from 'typeorm';

import {messages} from '../../config/constants';
import ICreateConfigDTO from '../../web/dtos/ICreateConfigDTO';
import ConfigsRepository from '../../repositories/configs/ConfigsRepository';

class CreateConfigService {
  public async execute({token}: ICreateConfigDTO): Promise<ICreateConfigDTO> {
    const configDB = getCustomRepository(ConfigsRepository);

    try {
      const checkToken = await configDB.findOne({where: 'token IS NOT NULL'});

      if (checkToken) {
        checkToken.token = token;
        const updateToken = await configDB.save(checkToken);

        return updateToken;
      }

      const config = configDB.create({
        token,
      });

      const savedConfig = configDB.save(config);

      return savedConfig;
    } catch (err) {
      console.error(err);
      throw new Error(messages.error.config);
    }
  }
}
export default CreateConfigService;
