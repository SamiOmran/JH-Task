import jwt from 'jsonwebtoken';

import { successResponse, errorResponse } from '../response_handler/index.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as usersService from '../services/users.service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

const createToken = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
		expiresIn: '7d',
	});
};

const sanitizeUser = (user) => {
	const userObject = user.toObject ? user.toObject() : { ...user };
	delete userObject.password;
	return userObject;
};

export const getUserById = async (req, res) => {
	const { id } = req.params;
	const user = await usersService.getUserById(id);

	return successResponse(res, user, HTTP_STATUS.OK, 'User found successfully');
};

export const signUp = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	const newUser = await usersService.createUser({
		email,
		password,
		firstName,
		lastName,
	});

	const token = createToken(newUser);
	const user = sanitizeUser(newUser);

	return successResponse(
		res,
		{ user, token },
		HTTP_STATUS.CREATED,
		'User created successfully',
	);
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await usersService.login({ email, password });

	if (!user) {
		return errorResponse(
			new Error('Invalid email or password'),
			res,
			'Invalid email or password',
			HTTP_STATUS.UNAUTHORIZED,
		);
	}

	const token = createToken(user);
	const sanitizedUser = sanitizeUser(user);

	return successResponse(
		res,
		{ user: sanitizedUser, token },
		HTTP_STATUS.OK,
		'User logged in successfully',
	);
};
