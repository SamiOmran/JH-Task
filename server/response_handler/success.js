import { HTTP_STATUS } from '../utils/constants.js';

export function successResponse(
	res,
	data,
	statusCode = HTTP_STATUS.OK,
	message = 'Success',
) {
	return res.status(statusCode).json({
		success: true,
		message,
		data: data,
	});
}
