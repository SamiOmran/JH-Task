import mongoose from 'mongoose';
import { TaskStatus, TaskStatusValues } from './enum.js';

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: TaskStatusValues,
			default: TaskStatus.PENDING,
		},
		assignedTo: {
			type: mongoose.Schema.Types.UUID,
			required: false,
		},
	},
	{ timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
