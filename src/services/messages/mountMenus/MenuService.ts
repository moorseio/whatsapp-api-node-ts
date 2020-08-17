/* eslint-disable prettier/prettier */
import {getCustomRepository} from 'typeorm';

import {messages} from '../../../config/constants';
import ItemsRepository from '../../../repositories/messages/ItemsRepository';

async function menu(menuId?: number): Promise<string> {
  const itemDB = getCustomRepository(ItemsRepository);
  let mountMenu = '';
  try {
    const itemInfo = await itemDB.find({
      where: {menuId: menuId ? menuId + 1 : 1},
    });

    itemInfo.forEach((item) => {
      const strigifyPosition = JSON.stringify(item.position);
      const strigifyItem = JSON.stringify(item.name);
      mountMenu += `${strigifyPosition} - ${strigifyItem.replace(/\"/g,'',)}\\n`;
    });

    return mountMenu;
  } catch (err) {
    console.error(err);
    throw new Error(messages.error.mountMessage);
  }
}
export default menu;
