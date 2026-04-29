import { errorHandler } from '../response_handler/errors.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const checkEntityExists = ({ model, param = 'id' }) => {
	return async (req, res, next) => {
		try {
			const value = req.params[param];

			if (!value) {
				return errorHandler(
					new Error('Missing required parameter'),
					req,
					res,
					next,
					'Missing required parameter',
					HTTP_STATUS.BAD_REQUEST,
				);
			}

			const entity = await model.findById(value);

			if (!entity) {
				return errorHandler(
					new Error('Resource not found'),
					req,
					res,
					next,
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
};
