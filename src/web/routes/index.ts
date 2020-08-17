import {Router} from 'express';

import webHookRouter from './webhook.routes';

const routes = Router();

routes.use(`/webhook`, webHookRouter);

export default routes;
