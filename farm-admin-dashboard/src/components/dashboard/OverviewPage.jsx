import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beef, Skull, Droplets, TrendingUp, ShoppingCart, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getOverview } from '../../api/analytics';
import { SPECIES } from '../../utils/constants';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { CardSkeleton, ErrorState } from '../shared/States';
import useLanguageStore from '../../store/languageStore';
import gsap from 'gsap';

const KPICard = ({ icon: Icon, label, value, color, suffix, onClick, rtl }) => (
  <div onClick={onClick} className={`page-card p-5 flex items-start gap-4 transition-all duration-200 hover:shadow-card-hover ${onClick ? 'cursor-pointer' : ''} ${rtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
    <div className={`p-2.5 rounded-xl ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-ink-soft font-medium">{label}</p>
      <p className="text-xl font-bold text-ink font-display mt-0.5">
        {typeof value === 'number' ? formatNumber(value) : value}
        {suffix && <span className={`text-xs font-normal text-ink-muted ${rtl ? 'mr-1' : 'ml-1'}`}>{suffix}</span>}
      </p>
    </div>
  </div>
);

const OverviewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguageStore();
  const rtl = isRTL();

  const load = () => {
    setLoading(true); setError(null);
    getOverview()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  useEffect(() => {
    if (!data) return;
    gsap.fromTo('.kpi-card-item', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' });
  }, [data]);

  if (loading) return <CardSkeleton count={6} />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const totalLive = Object.values(data.live_counts || {}).reduce((a, b) => a + b, 0);
  const speciesBreakdown = Object.entries(data.live_counts || {}).map(([sp, count]) => ({
    name: t(`species.${sp}`) || SPECIES[sp]?.label || sp,
    count,
    icon: SPECIES[sp]?.icon
  }));

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="space-y-6 animate-fade-in">
      <div className={rtl ? 'text-right' : 'text-left'}>
        <h1 className="font-display text-xl font-bold text-ink">{t('dashboard.title')}</h1>
        <p className="text-ink-soft text-sm mt-0.5">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="kpi-card-item">
          <KPICard icon={Beef} label={t('dashboard.totalLiveAnimals')} value={totalLive} color="bg-primary" rtl={rtl} />
        </div>
        <div className="kpi-card-item">
          <KPICard icon={TrendingUp} label={t('dashboard.birthsThisMonth')} value={data.births_this_month} color="bg-primary" rtl={rtl} />
        </div>
        <div className="kpi-card-item">
          <KPICard icon={Skull} label={t('dashboard.totalDeaths')} value={data.deaths_total} color="bg-danger" suffix={`${data.mortality_rate}%`} rtl={rtl} />
        </div>
        <div className="kpi-card-item">
          <KPICard icon={Droplets} label={t('dashboard.milkThisMonth')} value={data.milk_this_month} color="bg-primary-light" suffix="L" rtl={rtl} />
        </div>
        <div className="kpi-card-item">
          <KPICard icon={ShoppingCart} label={t('dashboard.approvedListings')} value={data.approved_listings} color="bg-primary" rtl={rtl} />
        </div>
        <div className="kpi-card-item">
          <KPICard icon={AlertTriangle} label={t('dashboard.feedCost')} value={formatCurrency(data.feed_cost_this_month)} color="bg-gold" rtl={rtl} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Species breakdown */}
        <div className="page-card p-5">
          <h3 className={`font-display text-sm font-bold text-ink mb-4 ${rtl ? 'text-right' : 'text-left'}`}>{t('dashboard.animalDistribution')}</h3>
          <div className={`flex items-center justify-around py-4 ${rtl ? 'flex-row-reverse' : ''}`}>
            {speciesBreakdown.map((s) => (
              <div key={s.name} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-3xl mb-2 group-hover:shadow-neon transition-shadow">
                  {s.icon}
                </div>
                <p className="text-lg font-bold font-display text-ink">{s.count}</p>
                <p className="text-[11px] text-ink-soft">{s.name}</p>
              </div>
            ))}
            {speciesBreakdown.length === 0 && <p className="text-ink-muted text-sm">{t('dashboard.noAnimals')}</p>}
          </div>
        </div>

        {/* Revenue summary */}
        <div className="page-card p-5">
          <h3 className={`font-display text-sm font-bold text-ink mb-4 ${rtl ? 'text-right' : 'text-left'}`}>{t('dashboard.revenueSummary')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface text-center">
              <p className="text-lg font-bold font-display text-primary">{formatCurrency(data.revenue)}</p>
              <p className="text-[11px] text-ink-soft mt-0.5">{t('dashboard.totalRevenue')}</p>
            </div>
            <div className="p-3 rounded-xl bg-surface text-center">
              <p className="text-lg font-bold font-display text-primary">{data.sold_listings || 0}</p>
              <p className="text-[11px] text-ink-soft mt-0.5">{t('dashboard.itemsSold')}</p>
            </div>
            <div className="p-3 rounded-xl bg-surface text-center">
              <p className="text-lg font-bold font-display text-danger">{data.mortality_rate || 0}%</p>
              <p className="text-[11px] text-ink-soft mt-0.5">{t('dashboard.mortalityRate')}</p>
            </div>
            <div className="p-3 rounded-xl bg-surface text-center">
              <p className="text-lg font-bold font-display text-ink">{data.milk_this_month || 0}L</p>
              <p className="text-[11px] text-ink-soft mt-0.5">{t('dashboard.milkProduced')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;

