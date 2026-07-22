import api from './axios';

export const getSettings = () => api.get('/admin/settings').then(r => r.data);
export const getSettingsGroup = (group) => api.get(`/admin/settings/${group}`).then(r => r.data);
export const updateSettings = (data) => api.put('/admin/settings', data).then(r => r.data);
