import * as tasksService from '../services/tasks.service.js';
import { successResponse } from '../response_handler/index.js';
import { HTTP_STATUS } from '../utils/constants.js';

export async function listTasks(req, res) {
	const tasks = await tasksService.list(req.user._id);

	return successResponse(
		res,
		tasks,
		HTTP_STATUS.OK,
		'Tasks retrieved successfully',
	);
}

export function getTaskById(req, res) {
	const task = req.entity;

	return successResponse(
		res,
		task,
		HTTP_STATUS.OK,
		'Task retrieved successfully',
	);
}

export async function createTask(req, res) {
	const taskData = { ...req.body, assignedTo: req.user._id };
	const task = await tasksService.create(taskData);
	console.log('Created task:', task);
	return successResponse(
		res,
		task,
		HTTP_STATUS.CREATED,
		'Task created successfully',
	);
}

export async function updateTask(req, res) {
	const task = req.entity;
	const updatedTask = await tasksService.update(req.params.id, task, req.body);

	return successResponse(
		res,
		updatedTask,
		HTTP_STATUS.OK,
		'Task updated successfully',
	);
}

export async function deleteTask(req, res) {
	console.log('Deleting task with ID:', req.params.id);
	const task = req.entity;
	await tasksService.deleteTask(req.params.id, task);

	return successResponse(
		res,
		null,
		HTTP_STATUS.OK,
		'Task deleted successfully',
	);
}
