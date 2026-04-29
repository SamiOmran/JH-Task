import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask, updateTask } from '../api/tasks.js';

function Tasks() {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const loadTasks = async () => {
		try {
			const res = await getTasks();
			setTasks(res.data.data);
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				navigate('/login');
				return;
			}
			setMessage(error.response?.data?.message || 'Unable to load tasks.');
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
			return;
		}
		loadTasks();
	}, [navigate]);

	const handleCreate = async (event) => {
		event.preventDefault();
		setMessage('');

		try {
			await createTask({ title, description });
			setTitle('');
			setDescription('');
			loadTasks();
		} catch (error) {
			setMessage(error.response?.data?.message || 'Unable to create task.');
		}
	};

	const handleDelete = async (id) => {
		setMessage('');
		try {
			await deleteTask(id);
			loadTasks();
		} catch (error) {
			setMessage(error.response?.data?.message || 'Unable to delete task.');
		}
	};

	const handleToggleStatus = async (task) => {
		setMessage('');

		try {
			await updateTask(task._id, {
				status: task.status === 'completed' ? 'pending' : 'completed',
			});
			loadTasks();
		} catch (error) {
			setMessage(error.response?.data?.message || 'Unable to update task.');
		}
	};

	const styles = {
		page: {
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'flex-start',
			paddingTop: '40px',
			background: 'linear-gradient(135deg, #eef2f7, #dbe4f0)',
			fontFamily: 'Arial, sans-serif',
		},

		card: {
			width: '420px',
			padding: '24px',
			borderRadius: '14px',
			backgroundColor: '#fff',
			boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
		},

		title: {
			textAlign: 'center',
			marginBottom: '18px',
		},

		form: {
			display: 'grid',
			gap: '10px',
			marginBottom: '18px',
		},

		input: {
			padding: '10px',
			borderRadius: '8px',
			border: '1px solid #ccc',
		},

		textarea: {
			padding: '10px',
			borderRadius: '8px',
			border: '1px solid #ccc',
			minHeight: '80px',
			resize: 'vertical',
		},

		button: {
			padding: '10px 14px',
			border: 'none',
			borderRadius: '8px',
			backgroundColor: '#4a90e2',
			color: '#fff',
			cursor: 'pointer',
		},

		taskRow: {
			display: 'grid',
			gridTemplateColumns: '1fr auto',
			gap: '12px',
			padding: '14px',
			marginBottom: '10px',
			borderRadius: '10px',
			backgroundColor: '#f7f9fc',
		},

		taskInfo: {
			display: 'grid',
			gap: '6px',
		},

		taskTitle: {
			fontSize: '15px',
			fontWeight: 600,
		},

		taskMeta: {
			fontSize: '13px',
			color: '#666',
		},

		controls: {
			display: 'flex',
			alignItems: 'center',
			gap: '8px',
		},

		doneBtn: {
			padding: '8px 10px',
			border: 'none',
			borderRadius: '8px',
			backgroundColor: '#7cb342',
			color: '#fff',
			cursor: 'pointer',
		},

		deleteBtn: {
			padding: '8px 10px',
			border: 'none',
			borderRadius: '8px',
			backgroundColor: '#e53935',
			color: '#fff',
			cursor: 'pointer',
		},

		empty: {
			textAlign: 'center',
			color: '#888',
			marginTop: '18px',
		},

		message: {
			minHeight: '22px',
			marginBottom: 14,
			color: '#d32f2f',
		},
	};

	return (
		<div style={styles.page}>
			<div style={styles.card}>
				<h2 style={styles.title}>Your Tasks</h2>

				<form onSubmit={handleCreate} style={styles.form}>
					<input
						type="text"
						placeholder="Task title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						style={styles.input}
					/>
					<textarea
						placeholder="Task description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						style={styles.textarea}
					/>
					<button type="submit" style={styles.button}>
						Add Task
					</button>
				</form>

				<p style={styles.message}>{message}</p>

				{tasks.length === 0 ? (
					<p style={styles.empty}>No tasks yet</p>
				) : (
					tasks.map((task) => (
						<div key={task._id} style={styles.taskRow}>
							<div style={styles.taskInfo}>
								<span style={styles.taskTitle}>{task.title}</span>
								<span style={styles.taskMeta}>{task.description}</span>
								<span style={styles.taskMeta}>Status: {task.status}</span>
							</div>
							<div style={styles.controls}>
								<button
									onClick={() => handleToggleStatus(task)}
									style={styles.doneBtn}
								>
									{task.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
								</button>
								<button
									onClick={() => handleDelete(task._id)}
									style={styles.deleteBtn}
								>
									Delete
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Tasks;
