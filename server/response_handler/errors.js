import { HTTP_STATUS } from '../utils/constants.js';

export default function errorResponse(
	err,
	res,
	msg,
	statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
) {
	res.status(statusCode).json({ success: false, message: msg || err.message });
}
