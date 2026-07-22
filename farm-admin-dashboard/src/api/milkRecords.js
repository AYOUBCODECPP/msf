import api from './axios';

export const getMilkRecords = (params) => api.get('/milk-records', { params }).then(r => r.data);
export const createMilkRecord = (data) => api.post('/milk-records', data).then(r => r.data);
