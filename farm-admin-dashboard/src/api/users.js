import api from './axios';

export const getUsers = () => api.get('/admin/users').then(r => r.data);
export const createUser = (data) => api.post('/admin/users', data).then(r => r.data);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data).then(r => r.data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
