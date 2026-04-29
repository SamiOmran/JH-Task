import { validationResult } from 'express-validator';

import { HTTP_STATUS } from './constants.js';
import { errorHandler } from '../response_handler/errors.js';

export default function validate(rules) {
	return [
		...rules,

		(req, res, next) => {
			const errors = validationResult(req);
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: 'Validation failed',
					errors: errors.array(),
				});
			}

			next();
		},
	];
}
