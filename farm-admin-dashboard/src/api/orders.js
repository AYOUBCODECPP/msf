import api from './axios';

export const getOrders = (params) => api.get('/admin/orders', { params }).then(r => r.data);
export const getOrder = (id) => api.get(`/admin/orders/${id}`).then(r => r.data);
