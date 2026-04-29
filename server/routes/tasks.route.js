import express from 'express';

import * as controller from '../controllers/tasks.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { checkEntityExists } from '../middlewares/check_entity_exists.js';
import Task from '../models/task.js';
import {
	createTaskValidationRules,
	updateTaskValidationRules,
} from '../validators/tasks.validator.js';

const router = express.Router();

// router.use(authenticate);

router.get('/', controller.listTasks);

router.post('/', createTaskValidationRules(), controller.createTask);

router.get('/:id', checkEntityExists({ model: Task }), controller.getTaskById);

router.put(
	'/:id',
	checkEntityExists({ model: Task }),
	updateTaskValidationRules(),
	controller.updateTask,
);

router.delete(
	'/:id',
	checkEntityExists({ model: Task }),
	controller.deleteTask,
);

export default router;
