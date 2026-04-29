import { body } from 'express-validator';
import { TaskStatusValues } from '../models/enum.js';
import validate from '../utils/error_middleware.js';

export function createTaskValidationRules() {
	const rules = [
		body('title')
			.isString()
			.withMessage('Title must be a string')
			.notEmpty()
			.withMessage('Title cannot be empty'),

		body('description')
			.isString()
			.withMessage('Description must be a string')
			.notEmpty()
			.withMessage('Description cannot be empty'),

		body('status')
			.optional()
			.isIn(TaskStatusValues)
			.withMessage('Status must be one of: pending, in_progress, completed'),

		body('assignedTo')
			.optional()
			.isUUID()
			.withMessage('AssignedTo must be a valid UUID'),
	];

	return validate(rules);
}

export async function updateTaskValidationRules() {
	const rules = [
		body('title')
			.optional()
			.isString()
			.withMessage('Title must be a string')
			.isLength({ min: 1 })
			.withMessage('Title cannot be empty'),
		body('description')
			.optional()
			.isString()
			.withMessage('Description must be a string'),
		body('status')
			.optional()
			.isIn(TaskStatusValues)
			.withMessage('Status must be one of: pending, in_progress, completed'),
		body('assignedTo')
			.optional()
			.isUUID()
			.withMessage('AssignedTo must be a valid UUID'),
	];

	return await validate(rules);
}
