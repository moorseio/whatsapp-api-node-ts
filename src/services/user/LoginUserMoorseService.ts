import {container} from 'tsyringe';

import {auth} from '../../config/api';
import {credentials, messages} from '../../config/constants';

import ICreateConfigDTO from '../../web/dtos/ICreateConfigDTO';
import CreateConfigService from '../config/CreateConfigService';

async function loginUser(): Promise<ICreateConfigDTO> {
  try {
    const createToken = container.resolve(CreateConfigService);

    const response = await auth.post('/login', {
      login: credentials.login,
      senha: credentials.password,
    });

    const saveTokenInDB = await createToken.execute({
      token: response.data.data,
    });

    return saveTokenInDB;
  } catch (err) {
    console.error(err);
    throw new Error(messages.error.user);
  }
}
export default loginUser;
