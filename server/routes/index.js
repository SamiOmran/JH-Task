import express from 'express';

import usersRoutes from './users.route.js';
import tasksRoutes from './tasks.route.js';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/tasks', tasksRoutes);

export default routes;
