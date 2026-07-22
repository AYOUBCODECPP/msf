import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useUiStore from '../../store/uiStore';
import useLanguageStore from '../../store/languageStore';

const AppShell = () => {
  const { sidebarOpen } = useUiStore();
  const { isRTL } = useLanguageStore();
  const rtl = isRTL();

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-surface">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          rtl
            ? sidebarOpen ? 'md:mr-72' : 'md:mr-20'
            : sidebarOpen ? 'md:ml-72' : 'md:ml-20'
        }`}
      >
        <Topbar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
