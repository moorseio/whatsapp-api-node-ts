import {Router} from 'express';
import {container} from 'tsyringe';
import WebHookController from '../../controllers/WebHookController';

const webHookRouter = Router();
const webHookController = container.resolve(WebHookController);

webHookRouter.post('/', webHookController.create);

export default webHookRouter;
