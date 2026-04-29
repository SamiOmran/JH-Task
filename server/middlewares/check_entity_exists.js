import { errorResponse } from '../response_handler/index.js';
import { HTTP_STATUS } from '../utils/constants.js';

export function checkEntityExists({ model, param = 'id' }) {
	return async (req, res, next) => {
		try {
			const value = req.params[param];

			if (!value) {
				return errorResponse(
					new Error('Missing required parameter'),
					res,
					'Missing required parameter',
					HTTP_STATUS.BAD_REQUEST,
				);
			}

			const entity = await model.findById(value);

			if (!entity) {
				return errorResponse(
					new Error('Resource not found'),
					res,
					'Resource not found',
					HTTP_STATUS.NOT_FOUND,
				);
			}
			req.entity = entity;
			next();
		} catch (error) {
			next(error);
		}
	};
}
