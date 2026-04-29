import Task from '../models/task.js';

export const list = async () => {
	return await Task.find();
};

export const create = async (taskData) => {
	const task = new Task(taskData);
	return await task.save();
};

export const update = async (id, task, taskData) => {
	task.update(taskData);
	return await task.save();
};

export const deleteTask = async (id, task) => {
	return await task.remove();
};
