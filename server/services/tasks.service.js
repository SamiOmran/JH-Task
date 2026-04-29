import Task from '../models/task.js';

export const list = () => {
	return Task.find();
};

export const create = (taskData) => {
	const task = new Task(taskData);

	return task.save();
};

export const update = async (task, taskData) => {
	task.set(taskData);

	return await task.save();
};

export const deleteTask = (task) => {
	return task.deleteOne();
};
