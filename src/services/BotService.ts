import {container} from 'tsyringe';

import {messages} from '../config/constants';
import IWebHookDTO from '../web/dtos/IWebHookDTO';
import sendMessage from './messages/SendMessageService';
import CreateUserService from './user/CreateUserService';
import CreateProductService from './product/CreateProductService';

class BotService {
  public async execute(data: IWebHookDTO): Promise<void> {
    const userSrv = container.resolve(CreateUserService);
    const productSrv = container.resolve(CreateProductService);

    try {
      if (data.status === messages.status.answered) {
        const user = await userSrv.execute({
          name: data.contactUser.name,
          number: data.contactUser.number,
        });

        const product = await productSrv.execute({
          usersId: user.id,
        });

        sendMessage({
          from: Number(data.from),
          to: Number(data.to),
          content: data.content,
          product,
          user,
        });
      }
    } catch (err) {
      console.error(err);
      throw new Error(messages.error.createUser);
    }
  }
}
export default BotService;
