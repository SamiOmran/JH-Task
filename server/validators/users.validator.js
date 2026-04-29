import { body } from 'express-validator';

import validate from '../utils/error_middleware.js';
import { getUserByEmail } from '../services/users.service.js';

export function signUpValidationRules() {
	const rules = [
		body('email')
			.trim()
			.notEmpty()
			.withMessage('Email cannot be empty')
			.bail()
			.isEmail()
			.withMessage('Email must be valid')
			.bail()
			.normalizeEmail()
			.custom(async (email) => {
				const user = await getUserByEmail(email);
				if (user) {
					return Promise.reject('Email already exists');
				}

				return true;
			}),
		body('password')
			.notEmpty()
			.withMessage('Password cannot be empty')
			.bail()
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),

		body('firstName')
			.notEmpty()
			.withMessage('First Name cannot be empty')
			.bail()
			.isLength({ min: 2 })
			.withMessage('First Name must be at least 2 characters long'),
		body('lastName')
			.notEmpty()
			.withMessage('Last Name cannot be empty')
			.bail()
			.isLength({ min: 2 })
			.withMessage('Last Name must be at least 2 characters long'),
	];

	return validate(rules);
}

export function loginValidationRules() {
	const rules = [
		body('email')
			.trim()
			.notEmpty()
			.withMessage('Email cannot be empty')
			.bail()
			.isEmail()
			.withMessage('Email must be valid')
			.bail(),
		body('password')
			.notEmpty()
			.withMessage('Password cannot be empty')
			.bail()
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
	];

	return validate(rules);
}
