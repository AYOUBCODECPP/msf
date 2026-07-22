import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu, PanelLeftClose, PanelLeft, Languages } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';
import useLanguageStore from '../../store/languageStore';

const Topbar = () => {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, setMobileSidebarOpen } = useUiStore();
  const { t, language, toggleLanguage, isRTL } = useLanguageStore();
  const navigate = useNavigate();
  const rtl = isRTL();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      dir={rtl ? 'rtl' : 'ltr'}
      className="h-14 bg-white border-b border-border flex items-center justify-between px-4 sticky top-0 z-20"
    >
      <div className={`flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-mint transition-colors"
        >
          <Menu size={20} className="text-ink-soft" />
        </button>
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-2 rounded-lg hover:bg-mint transition-colors"
          title={sidebarOpen ? t('collapse') : t('expand')}
        >
          {sidebarOpen
            ? <PanelLeftClose size={18} className="text-ink-soft" />
            : <PanelLeft size={18} className="text-ink-soft" />
          }
        </button>
        <span className="text-sm text-ink-soft">
          {t(`roles.${user?.role}`) || user?.role}
        </span>
      </div>

      <div className={`flex items-center gap-2 ${rtl ? 'flex-row-reverse' : ''}`}>

        {/* Language toggle button */}
        <button
          onClick={toggleLanguage}
          title={language === 'ar' ? 'Passer au Français' : 'التبديل إلى العربية'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-mint hover:border-primary/30 transition-all duration-200 group"
        >
          <Languages size={15} className="text-ink-soft group-hover:text-primary transition-colors" />
          <span className="text-xs font-semibold text-ink-soft group-hover:text-primary transition-colors">
            {language === 'ar' ? 'FR' : 'عر'}
          </span>
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-mint transition-colors"
          title={t('notifications')}
        >
          <Bell size={18} className="text-ink-soft" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User info */}
        <div className={`flex items-center gap-2 pl-2 border-l border-border ${rtl ? 'flex-row-reverse pr-2 pl-0 border-r border-l-0' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-neon flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">
              {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <span className="hidden sm:block text-sm font-medium text-ink">{user?.name}</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-danger/10 text-ink-soft hover:text-danger transition-colors"
          title={t('logout')}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
