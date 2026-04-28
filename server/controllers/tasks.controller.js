export function listTasks(req, res, ) {
	res.send('List all tasks');
}

export function getTaskById(req, res) {
	res.send('Get task by ID');
}

export function createTask(req, res) {
	res.send('Create a new task');
}

export function updateTask(req, res) {
	res.send('Update task by ID');
}

export function deleteTask(req, res) {
	res.send('Delete task by ID');
}
