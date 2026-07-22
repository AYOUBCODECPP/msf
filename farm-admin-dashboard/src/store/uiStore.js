import { create } from 'zustand';

const useUiStore = create((set) => ({
  sidebarOpen: true,
  mobileSidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),
}));

export default useUiStore;
