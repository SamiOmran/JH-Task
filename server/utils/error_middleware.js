import { validationResult } from 'express-validator';

import { HTTP_STATUS } from './constants.js';
import { errorResponse } from '../response_handler/index.js';

export default function validate(rules) {
	return [
		...rules,

		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return errorResponse(
					new Error('Validation failed'),
					res,
					errors
						.array()
						.map((err) => err.msg)
						.join(', '),
					HTTP_STATUS.BAD_REQUEST,
				);
			}

			next();
		},
	];
}
