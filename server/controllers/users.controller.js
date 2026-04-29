import { successResponse, errorResponse } from '../response_handler/index.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as usersService from '../services/users.service.js';

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

	return successResponse(
		res,
		newUser,
		HTTP_STATUS.CREATED,
		'User created successfully',
	);
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await usersService.login({ email, password });

	if (!user) {
		return errorResponse(
			res,
			null,
			HTTP_STATUS.UNAUTHORIZED,
			'Invalid email or password',
		);
	}
	return successResponse(
		res,
		user,
		HTTP_STATUS.OK,
		'User logged in successfully',
	);
};
