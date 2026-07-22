import { useState, useRef, useCallback, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Sprout, X } from 'lucide-react';
import gsap from 'gsap';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';
import useLanguageStore from '../../store/languageStore';
import NAVIGATION from '../../config/navigation';

const AccordionItem = ({ item, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const chevronRef = useRef(null);
  const location = useLocation();
  const { t, isRTL } = useLanguageStore();
  const isActive = location.pathname.startsWith(item.path || '');
  const rtl = isRTL();

  useEffect(() => {
    if (isActive && item.children) setOpen(true);
  }, [isActive]);

  const toggle = useCallback(() => {
    if (!item.children) return;
    const el = contentRef.current;
    const chevron = chevronRef.current;
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      gsap.set(el, { height: 'auto' });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: () => gsap.set(el, { height: 'auto' }) });
      gsap.to(chevron, { rotation: 180, duration: 0.3 });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(chevron, { rotation: 0, duration: 0.3 });
    }
  }, [open, item.children]);

  const displayLabel = item.labelKey ? t(item.labelKey) : item.label;

  if (item.children) {
    return (
      <div>
        <button
          onClick={toggle}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
            isActive ? 'bg-primary/10 text-primary' : 'text-ink-soft hover:bg-mint hover:text-ink'
          } ${rtl ? 'flex-row-reverse text-right' : ''}`}
        >
          {item.icon && <item.icon size={18} className="flex-shrink-0" />}
          <span className={`flex-1 truncate ${rtl ? 'text-right' : 'text-left'}`}>{displayLabel}</span>
          <ChevronDown ref={chevronRef} size={14} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
          <div className={`py-1 space-y-0.5 ${rtl ? 'pr-4' : 'pl-4'}`}>
            {item.children.map((child) => (
              <AccordionItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === '/dashboard'}
      className={({ isActive: linked }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
          depth > 0 ? (rtl ? 'pr-4' : 'pl-4') : ''
        } ${
          linked ? 'bg-primary/10 text-primary font-semibold' : 'text-ink-soft hover:bg-mint hover:text-ink'
        } ${rtl ? 'flex-row-reverse' : ''}`
      }
    >
      {item.icon && <item.icon size={16} className="flex-shrink-0" />}
      <span className="truncate">{displayLabel}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const { user } = useAuthStore();
  const { sidebarOpen, mobileSidebarOpen, setMobileSidebarOpen } = useUiStore();
  const { t, isRTL } = useLanguageStore();
  const role = user?.role;
  const items = NAVIGATION[role] || NAVIGATION.super_admin;
  const rtl = isRTL();

  const sidebar = (
    <div
      dir={rtl ? 'rtl' : 'ltr'}
      className={`fixed top-0 h-screen bg-white border-border flex flex-col transition-all duration-300 z-40 ${
        rtl ? 'right-0 border-l' : 'left-0 border-r'
      } ${sidebarOpen ? 'w-72' : 'w-0 md:w-20'} ${
        mobileSidebarOpen
          ? 'translate-x-0'
          : rtl
          ? 'translate-x-full md:translate-x-0'
          : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 h-16 border-b border-border flex-shrink-0 ${rtl ? 'flex-row-reverse' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-neon flex items-center justify-center flex-shrink-0">
          <Sprout size={20} className="text-white" />
        </div>
        {sidebarOpen && (
          <div className={`min-w-0 ${rtl ? 'text-right' : ''}`}>
            <h1 className="font-display text-base font-bold text-ink truncate">{t('appName')}</h1>
            <p className="text-[10px] text-ink-muted leading-none">{t('appSubtitle')}</p>
          </div>
        )}
      </div>

      {/* Mobile close */}
      <button
        onClick={() => setMobileSidebarOpen(false)}
        className={`md:hidden absolute top-4 p-1 rounded-lg hover:bg-mint ${rtl ? 'left-3' : 'right-3'}`}
      >
        <X size={18} className="text-ink-soft" />
      </button>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {sidebarOpen ? (
          items.map((item) => <AccordionItem key={item.id} item={item} />)
        ) : (
          items.map((item) =>
            item.children ? (
              <NavLink
                key={item.id}
                to={item.children[0].path}
                className="flex items-center justify-center py-2.5 rounded-xl text-ink-soft hover:bg-mint hover:text-ink transition-colors"
                title={item.labelKey ? t(item.labelKey) : item.label}
              >
                <item.icon size={20} />
              </NavLink>
            ) : (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive: linked }) =>
                  `flex items-center justify-center py-2.5 rounded-xl transition-colors ${
                    linked ? 'bg-primary/10 text-primary' : 'text-ink-soft hover:bg-mint hover:text-ink'
                  }`
                }
                title={item.labelKey ? t(item.labelKey) : item.label}
              >
                <item.icon size={20} />
              </NavLink>
            )
          )
        )}
      </nav>

      {/* User */}
      {sidebarOpen && user && (
        <div className={`border-t border-border px-4 py-3 flex-shrink-0`}>
          <div className={`flex items-center gap-2.5 ${rtl ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-neon flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white">
                {user.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className={`min-w-0 ${rtl ? 'text-right' : ''}`}>
              <p className="text-xs font-medium text-ink truncate">{user.name}</p>
              <p className="text-[10px] text-ink-muted truncate">
                {t(`roles.${user.role}`) || user.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {sidebar}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
