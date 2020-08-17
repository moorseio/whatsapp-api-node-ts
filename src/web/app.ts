import 'reflect-metadata';

import '../database';

import express from 'express';
import routes from './routes';
import loginUser from '../services/user/LoginUserMoorseService';

const app = express();

app.use(express.json());
app.use(routes);

loginUser();

export default app;
