import { HTTP_STATUS } from '../utils/constants.js';

export const errorHandler = (
	err,
	req,
	res,
	next,
	msg,
	statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
) => {
	console.error(err.stack);
	res.status(statusCode).json({ message: msg || err.message });
};
