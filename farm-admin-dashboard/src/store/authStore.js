import { create } from 'zustand';
import * as authApi from '../api/auth';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('farm_user') || 'null'),
  token: localStorage.getItem('farm_token') || null,
  loading: false,
  error: null,

  isAuthenticated: () => !!get().token,
  isSuperAdmin: () => get().user?.role === 'super_admin',
  getSection: () => get().user?.role,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authApi.login(email, password);
      localStorage.setItem('farm_token', data.token);
      localStorage.setItem('farm_user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  logout: async () => {
    try { await authApi.logout(); } catch (_) {}
    localStorage.removeItem('farm_token');
    localStorage.removeItem('farm_user');
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
