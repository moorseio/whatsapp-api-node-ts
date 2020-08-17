import {container} from 'tsyringe';

import BotService from './BotService';
import {messages} from '../config/constants';
import IWebHookDTO from '../web/dtos/IWebHookDTO';

class WebHookService {
  public async execute(data: IWebHookDTO): Promise<void> {
    const bot = container.resolve(BotService);

    try {
      console.log(data);
      await bot.execute(data);
    } catch (err) {
      console.error(err);
      throw new Error(messages.error.webhook);
    }
  }
}
export default WebHookService;
