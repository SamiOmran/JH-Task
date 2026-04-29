import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Tasks from './pages/tasks';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Tasks />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
