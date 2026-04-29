import express from 'express';
import dotenv from 'dotenv';

import routes from './routes/index.js';
import db from './utils/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const startServer = async () => {
	try {
		await db();

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);

		process.exit(1);
	}
};

startServer();
