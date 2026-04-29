import express from 'express';
import * as controller from '../controllers/users.controller.js';
import {
	loginValidationRules,
	signUpValidationRules,
} from '../validators/users.validator.js';

const router = express.Router();

router.get('/:id', controller.getUserById);

router.post('/signup', signUpValidationRules(), controller.signUp);
router.post('/login', loginValidationRules(), controller.login);

export default router;
