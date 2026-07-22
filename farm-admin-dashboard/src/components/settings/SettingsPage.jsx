import { useEffect, useState } from 'react';
import { Save, Loader2, Languages, Check } from 'lucide-react';
import { getSettings, updateSettings } from '../../api/settings';
import LoadingSpinner from '../shared/LoadingSpinner';
import useLanguageStore from '../../store/languageStore';

const SettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { t, language, setLanguage, isRTL } = useLanguageStore();
  const rtl = isRTL();

  useEffect(() => {
    getSettings()
      .then((resp) => {
        setSettings(resp.settings || {});
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (group, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [group]: { ...(prev[group] || {}), [key]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = [];
      Object.entries(settings).forEach(([group, keys]) => {
        Object.entries(keys).forEach(([key, value]) => {
          payload.push({ group, key, value });
        });
      });
      await updateSettings({ settings: payload });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="max-w-3xl mx-auto space-y-6">
      <div className={`flex items-center justify-between ${rtl ? 'flex-row-reverse' : ''}`}>
        <div className={rtl ? 'text-right' : ''}>
          <h1 className="font-serif text-2xl font-bold text-ink">{t('settings.title')}</h1>
          <p className="text-ink-soft text-sm mt-1">{t('settings.subtitle')}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="neon-btn inline-flex items-center gap-2 text-sm"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? t('settings.saving') : t('settings.save')}
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium flex items-center gap-2">
          <Check size={16} />
          {t('settings.savedSuccess')}
        </div>
      )}

      {/* ─── Language Switcher Card ─────────────────────────── */}
      <div className="premium-card p-6">
        <h3 className={`font-serif text-base font-bold text-ink mb-5 flex items-center gap-2 ${rtl ? 'flex-row-reverse' : ''}`}>
          <Languages size={18} className="text-primary" />
          {t('settings.language')}
        </h3>
        <div className={`flex gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
          {/* Arabic */}
          <button
            onClick={() => setLanguage('ar')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
              language === 'ar'
                ? 'border-primary bg-primary/10 text-primary shadow-sm'
                : 'border-border text-ink-soft hover:border-primary/40 hover:bg-mint'
            }`}
          >
            {language === 'ar' && <Check size={15} className="flex-shrink-0" />}
            <span className="text-lg leading-none">🇲🇦</span>
            <span>{t('settings.languageAr')}</span>
          </button>

          {/* French */}
          <button
            onClick={() => setLanguage('fr')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
              language === 'fr'
                ? 'border-primary bg-primary/10 text-primary shadow-sm'
                : 'border-border text-ink-soft hover:border-primary/40 hover:bg-mint'
            }`}
          >
            {language === 'fr' && <Check size={15} className="flex-shrink-0" />}
            <span className="text-lg leading-none">🇫🇷</span>
            <span>{t('settings.languageFr')}</span>
          </button>
        </div>
      </div>
      {/* ─────────────────────────────────────────────────────── */}

      {Object.entries(settings).map(([group, keys]) => (
        <div key={group} className="premium-card p-6">
          <h3 className={`font-serif text-base font-bold text-ink mb-5 capitalize ${rtl ? 'text-right' : ''}`}>
            {group}
          </h3>
          <div className="space-y-4">
            {Object.entries(keys).map(([key, value]) => (
              <div key={key}>
                <label className={`block text-sm font-medium text-ink-soft mb-1.5 capitalize ${rtl ? 'text-right' : ''}`}>
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handleChange(group, key, e.target.value)}
                  className={`neon-input ${rtl ? 'text-right' : ''}`}
                  dir={rtl ? 'rtl' : 'ltr'}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(settings).length === 0 && (
        <div className="premium-card p-16 text-center">
          <p className="text-ink-soft">{t('settings.noSettings')}</p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
