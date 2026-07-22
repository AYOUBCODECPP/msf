import api from './axios';

export const getAnimals = (params) => api.get('/animals', { params }).then(r => r.data);
export const getAnimal = (id) => api.get(`/animals/${id}`).then(r => r.data);
export const createAnimal = (data) => api.post('/animals', data).then(r => r.data);
export const updateAnimal = (id, data) => api.put(`/animals/${id}`, data).then(r => r.data);
export const deleteAnimal = (id) => api.delete(`/animals/${id}`);
export const uploadAnimalImages = (id, formData) =>
  api.post(`/animals/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const recordDeath = (id, data) => api.post(`/animals/${id}/death`, data).then(r => r.data);
export const addMedication = (id, data) => api.post(`/animals/${id}/medications`, data).then(r => r.data);
export const recordMilk = (id, data) => api.post(`/animals/${id}/milk`, data).then(r => r.data);
