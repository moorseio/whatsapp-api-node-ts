import {getCustomRepository} from 'typeorm';

import ICreateUserDTO from '../../web/dtos/ICreateUserDTO';
import ICreateConfigDTO from '../../web/dtos/ICreateConfigDTO';
import ICreateProductDTO from '../../web/dtos/ICreateProductDTO';

import ItemsRepository from '../../repositories/messages/ItemsRepository';
import ConfigsRepository from '../../repositories/configs/ConfigsRepository';
import ProductsRepository from '../../repositories/messages/ProductsRepository';

import {apiMessage} from '../../config/api';
import menu from './mountMenus/MenuService';
import result from './mountMenus/ResultService';
import {messages, status} from '../../config/constants';
import initialMessageService from './InitialMessageService';

interface MessageProps {
  from: number;
  to: number;
  content: string;
  product: ICreateProductDTO | null;
  user: ICreateUserDTO;
}

async function sendMessage({
  from,
  to,
  product,
  user,
  content,
}: MessageProps): Promise<ICreateConfigDTO> {
  const itemDB = getCustomRepository(ItemsRepository);
  const configDB = getCustomRepository(ConfigsRepository);
  const productDB = getCustomRepository(ProductsRepository);

  let mountMenu = '';
  const getToken = await configDB.findOne();

  try {
    if (product?.status === status.open) {
      initialMessageService({
        from,
        to,
        product,
        user,
      });
    } else {
      mountMenu = await menu();
    }

    if (Number(content) && product?.status === status.processing) {
      mountMenu = await menu(Number(content));
      await productDB.updateProductStatus(Number(product?.id), status.ordering);
    }

    if (product?.status === status.ordering && Number(content)) {
      const item = await itemDB.findOne({where: {id: Number(content)}});

      if (item?.id && item.type === 'ITEM') {
        await productDB.insertProductItem(item.id, product.id);

        mountMenu = messages.menu.addedItem;
        mountMenu += await menu();

        await productDB.updateProductStatus(product?.id, status.processing);
      } else {
        mountMenu = await menu(Number(content));
      }
    }

    if (Number(content) === 4) {
      mountMenu = messages.menu.ordered;
      mountMenu += await result(product);
      await productDB.updateProductStatus(Number(product?.id), status.finished);
    }

    const response = await apiMessage.post(
      '/sendMessage',
      {
        from,
        to,
        body: mountMenu,
      },
      {headers: {Authorization: getToken?.token}},
    );

    return response.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(messages.error.sendMessage);
  }
}
export default sendMessage;
