import {getCustomRepository} from 'typeorm';

import ICreateUserDTO from '../../web/dtos/ICreateUserDTO';
import ICreateConfigDTO from '../../web/dtos/ICreateConfigDTO';
import ICreateProductDTO from '../../web/dtos/ICreateProductDTO';

import ConfigsRepository from '../../repositories/configs/ConfigsRepository';
import ProductsRepository from '../../repositories/messages/ProductsRepository';

import {apiMessage} from '../../config/api';
import {messages, status} from '../../config/constants';
import menu from './mountMenus/MenuService';

interface MessageProps {
  from: number;
  to: number;
  content?: string;
  product: ICreateProductDTO | null;
  user: ICreateUserDTO;
}

async function initialMessageService({
  from,
  to,
  product,
  user,
}: MessageProps): Promise<ICreateConfigDTO> {
  const configDB = getCustomRepository(ConfigsRepository);
  const productDB = getCustomRepository(ProductsRepository);

  let mountMenu = '';
  const getToken = await configDB.findOne();

  try {
    mountMenu = `Olá ${user.name}!`;
    mountMenu += messages.menu.welcome;
    mountMenu += await menu();

    await productDB.updateProductStatus(Number(product?.id), status.processing);

    const response = await apiMessage.post(
      '/sendFile',
      {
        from,
        to,
        body: messages.file.imageURL,
        fileName: messages.file.fileName,
        caption: mountMenu,
      },
      {headers: {Authorization: getToken?.token}},
    );

    return response.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(messages.error.sendMessage);
  }
}
export default initialMessageService;
