const mongoose = require('mongoose');
const { TaskStatus } = require('./enum');

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
			enum: TaskStatus.values(),
			default: TaskStatus.PENDING,
		},
		assignedTo: {
			type: mongoose.Schema.Types.UUID,
			required: true,
		},
	},
	{ timestamps: true },
);

export default Task = mongoose.model('Task', taskSchema);
