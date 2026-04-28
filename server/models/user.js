import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.UUID,
			default: randomUUID,
		},
		firstName: {
			type: String,
			required: true,
			name: 'first_name',
		},
		lastName: {
			type: String,
			required: true,
			name: 'last_name',
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			length: 6,
		},
	},
	{ timestamps: true },
);

export default User = mongoose.model('User', userSchema);
