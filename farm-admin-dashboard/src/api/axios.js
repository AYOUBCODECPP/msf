import axios from 'axios';
import { mockData } from './mockData';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  adapter: async (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = { success: true };
        const url = config.url;
        
        if (url.includes('/admin/analytics/overview')) data = mockData.overview;
        else if (url.includes('/admin/analytics/section')) data = mockData.sectionStats;
        else if (url.includes('/admin/analytics/sales')) data = mockData.salesStats;
        else if (url.includes('/animals') && config.method === 'get' && !url.match(/\/animals\/\d+/)) data = mockData.animals;
        else if (url.match(/\/animals\/\d+/)) data = mockData.animals.data[0];
        else if (url.includes('/login')) data = { token: 'dummy_token', user: mockData.user };
        else if (url.includes('/logout')) data = { success: true };
        else if (url.includes('/me')) data = mockData.user;
        else if (url.includes('/death-records')) data = mockData.deathRecords;
        else if (url.includes('/feed-records')) data = mockData.feedRecords;
        else if (url.includes('/medications')) data = mockData.medications;
        else if (url.includes('/milk-records')) data = mockData.milkRecords;
        else if (url.includes('/admin/orders')) data = mockData.orders;
        else if (url.includes('/admin/sale-listings/pending')) data = mockData.pendingListings;
        else if (url.includes('/admin/sale-listings')) data = mockData.saleListings;
        else if (url.includes('/admin/settings')) data = mockData.settings;
        else if (url.includes('/admin/users')) data = mockData.users;

        resolve({
          data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {}
        });
      }, 500); // simulate network delay
    });
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('farm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('farm_token');
      localStorage.removeItem('farm_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
