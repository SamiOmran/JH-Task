import jwt from 'jsonwebtoken';

import { errorResponse } from '../response_handler/index.js';
import { HTTP_STATUS } from '../utils/constants.js';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const authenticate = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;

		if (!authorization || !authorization.startsWith('Bearer ')) {
			return errorResponse(
				new Error('Missing authorization token'),
				res,
				'Unauthorized',
				HTTP_STATUS.UNAUTHORIZED,
			);
		}

		const token = authorization.split(' ')[1];
		const payload = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(payload.id);

		if (!user) {
			return errorResponse(
				new Error('Invalid token'),
				res,
				'Unauthorized',
				HTTP_STATUS.UNAUTHORIZED,
			);
		}

		req.user = user;
		next();
	} catch (error) {
		return errorResponse(
			error,
			res,
			'Invalid or expired token',
			HTTP_STATUS.UNAUTHORIZED,
		);
	}
};
