import api from './axios';

export const getMedications = (params) => api.get('/medications', { params }).then(r => r.data);
export const createMedication = (data) => api.post('/medications', data).then(r => r.data);
