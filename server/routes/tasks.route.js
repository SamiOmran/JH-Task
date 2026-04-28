import express from 'express';
import * as controller from '../controllers/tasks.controller.js';

const router = express.Router();

router.get('/', controller.listTasks);

router.get('/:id', controller.getTaskById);

router.post('/', controller.createTask);

router.put('/:id', controller.updateTask);

router.delete('/:id', controller.deleteTask);

export default router;
