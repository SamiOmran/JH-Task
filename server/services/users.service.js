import bcrypt from 'bcrypt';

import User from '../models/user.js';

export const getUserByEmail = async (email) => {
	return await User.findOne({ email });
};

export const createUser = async ({ email, password, firstName, lastName }) => {
	const hash = await bcrypt.hash(password, 3);
	const user = await User.create({
		email,
		password: hash,
		firstName,
		lastName,
	});

	return user;
};

export const login = async ({ email, password }) => {
	const user = await User.findOne({ email });

	if (!user) {
		return null;
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return null;
	}

	return user;
};
