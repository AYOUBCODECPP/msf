import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import translations from '../i18n/translations';

const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: 'fr', // Default: French
      
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((s) => ({ language: s.language === 'ar' ? 'fr' : 'ar' })),

      // t(key) — dot-notation access, e.g. t('nav.dashboard')
      t: (key) => {
        const lang = get().language;
        const dict = translations[lang];
        const parts = key.split('.');
        let val = dict;
        for (const p of parts) {
          if (val == null) return key;
          val = val[p];
        }
        return val ?? key;
      },

      isRTL: () => get().language === 'ar',
    }),
    {
      name: 'farm-language',
    }
  )
);

export default useLanguageStore;
