import api from './axios';

export const getFeedRecords = (params) => api.get('/feed-records', { params }).then(r => r.data);
export const createFeedRecord = (data) => api.post('/feed-records', data).then(r => r.data);
