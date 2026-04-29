import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.js';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		setMessage('');

		try {
			const res = await login({ email, password });
			const { token, user } = res.data.data;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		} catch (error) {
			setMessage(error.response?.data?.message || 'Login failed');
		}
	};

	return (
		<div
			style={{
				maxWidth: 360,
				margin: '40px auto',
				padding: 24,
				border: '1px solid #ddd',
				borderRadius: 12,
				background: '#fff',
			}}
		>
			<h1 style={{ marginBottom: 16, textAlign: 'center' }}>Login</h1>

			<form onSubmit={handleLogin} style={{ display: 'grid', gap: 12 }}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
				/>

				<button
					type="submit"
					style={{
						padding: 10,
						borderRadius: 6,
						border: 'none',
						background: '#4a90e2',
						color: '#fff',
						cursor: 'pointer',
					}}
				>
					Login
				</button>
			</form>

			{message && (
				<p
					style={{
						marginTop: 16,
						color: message.includes('failed') ? '#d32f2f' : '#2e7d32',
					}}
				>
					{message}
				</p>
			)}
		</div>
	);
}

export default Login;
