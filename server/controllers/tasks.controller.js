import * as tasksService from '../services/tasks.service.js';
import { successResponse } from '../response_handler/index.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const listTasks = async (req, res) => {
	const tasks = await tasksService.list();

	return successResponse(
		res,
		tasks,
		HTTP_STATUS.OK,
		'Tasks retrieved successfully',
	);
};

export const getTaskById = (req, res) => {
	const task = req.entity;

	return successResponse(
		res,
		task,
		HTTP_STATUS.OK,
		'Task retrieved successfully',
	);
};

export const createTask = async (req, res) => {
	const taskData = { ...req.body };
	const task = await tasksService.create(taskData);

	return successResponse(
		res,
		task,
		HTTP_STATUS.CREATED,
		'Task created successfully',
	);
};

export const updateTask = async (req, res) => {
	const task = req.entity;
	const updatedTask = await tasksService.update(task, req.body);

	return successResponse(
		res,
		updatedTask,
		HTTP_STATUS.OK,
		'Task updated successfully',
	);
};

export const deleteTask = async (req, res) => {
	const task = req.entity;
	await tasksService.deleteTask(task);

	return successResponse(
		res,
		null,
		HTTP_STATUS.OK,
		'Task deleted successfully',
	);
};
