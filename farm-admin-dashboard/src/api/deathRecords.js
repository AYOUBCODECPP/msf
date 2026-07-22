import api from './axios';

export const getDeathRecords = () => api.get('/death-records').then(r => r.data);
export const createDeathRecord = (data) => api.post('/death-records', data).then(r => r.data);
