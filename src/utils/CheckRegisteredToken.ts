import jwt from 'jsonwebtoken';
import {getCustomRepository} from 'typeorm';

import {messages} from '../config/constants';
import ConfigsRepository from '../repositories/configs/ConfigsRepository';
import ICreateConfigDTO from '../web/dtos/ICreateConfigDTO';

interface TokenProps {
  exp: number;
}

async function checkRegisteredToken(): Promise<ICreateConfigDTO | null> {
  const configDB = getCustomRepository(ConfigsRepository);

  try {
    const checkToken = await configDB.findOne({where: 'token IS NOT NULL'});

    if (checkToken) {
      const {exp} = jwt.decode(checkToken.token) as TokenProps;

      if (Date.now() >= exp * 1000) {
        return null;
      }
      return checkToken;
    }

    return null;
  } catch (err) {
    console.error(err);
    throw new Error(messages.error.config);
  }
}
export default checkRegisteredToken;
