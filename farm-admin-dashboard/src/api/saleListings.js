import api from './axios';

export const getPendingListings = () => api.get('/admin/sale-listings/pending').then(r => r.data);
export const approveListing = (id, data) => api.put(`/admin/sale-listings/${id}/approve`, data).then(r => r.data);
export const getListings = (params) => api.get('/admin/sale-listings', { params }).then(r => r.data);
