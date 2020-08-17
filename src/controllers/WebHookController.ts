import {container} from 'tsyringe';
import {Request, Response} from 'express';
import WebHookService from '../services/WebHookService';

class WebHookController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(WebHookService);

    const userCreated = await createUser.execute(request.body);

    return response.json(userCreated);
  }
}
export default WebHookController;
