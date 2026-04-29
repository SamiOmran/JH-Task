import api from './axios';

export const login = (data) => api.post('/users/login', data);

export const register = (data) => api.post('/users/signup', data);
