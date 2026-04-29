import Task from '../models/task.js';

export const list = async (userId) => {
	return await Task.find();
};

export const create = async (taskData) => {
	const task = new Task(taskData);
	return await task.save();
};

export const update = async (task, taskData) => {
	task.update(taskData);
	return await task.save();
};

export const deleteTask = async (task) => {
	return await task.remove();
};
