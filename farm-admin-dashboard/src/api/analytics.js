import api from './axios';

export const getOverview = () => api.get('/admin/analytics/overview').then(r => r.data);
export const getSectionStats = (species) => api.get(`/admin/analytics/section/${species}`).then(r => r.data);
export const getSalesStats = (params) => api.get('/admin/analytics/sales', { params }).then(r => r.data);
