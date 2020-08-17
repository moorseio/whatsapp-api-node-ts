import {messages} from '../../../config/constants';
import ICreateProductDTO from '../../../web/dtos/ICreateProductDTO';

async function result(product: ICreateProductDTO | null): Promise<string> {
  let mountMenu = '';

  try {
    const itemInfo = product?.items;

    itemInfo?.forEach((item) => {
      const strigifyItem = JSON.stringify(item.name);
      mountMenu += `${strigifyItem.replace(/\"/g, '')}\\n`;
    });

    return mountMenu;
  } catch (err) {
    console.error(err);
    throw new Error(messages.error.mountMessage);
  }
}
export default result;
