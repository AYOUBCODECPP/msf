import { useEffect, useState } from 'react';
import { BarChart3, DollarSign, TrendingUp, ShoppingCart, Skull, Droplets } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getOverview } from '../../api/analytics';
import { SPECIES } from '../../utils/constants';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { CardSkeleton, ErrorState } from '../shared/States';
import gsap from 'gsap';

const COLORS = ['#C2703E', '#6B7F3B', '#D4A574', '#C0392B'];

const FinancialReportPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    gsap.fromTo('.fin-card', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' });
  }, [data]);

  if (loading) return <CardSkeleton count={4} />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const revenue = data.revenue || 0;
  const feedCost = data.feed_cost_this_month || 0;
  const profit = revenue - feedCost;

  const pieData = [
    { name: 'Revenue', value: revenue },
    { name: 'Feed Costs', value: feedCost },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <BarChart3 size={22} className="text-primary" /> Financial Report
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">Profit &amp; loss overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(revenue), color: 'bg-primary' },
          { icon: ShoppingCart, label: 'Items Sold', value: data.sold_listings || 0, color: 'bg-primary' },
          { icon: TrendingUp, label: 'Net Profit', value: formatCurrency(profit), color: profit >= 0 ? 'bg-primary' : 'bg-danger' },
          { icon: Skull, label: 'Mortality Rate', value: `${data.mortality_rate || 0}%`, color: 'bg-danger' },
        ].map((stat, i) => (
          <div key={i} className="fin-card page-card p-5 flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${stat.color}`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-ink-soft font-medium">{stat.label}</p>
              <p className="text-xl font-bold font-display text-ink mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="page-card p-5">
          <h3 className="font-display text-sm font-bold text-ink mb-4">Revenue vs Expenses</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${formatCurrency(value)}`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-ink-muted text-sm text-center py-12">No financial data yet</p>
          )}
        </div>

        <div className="page-card p-5">
          <h3 className="font-display text-sm font-bold text-ink mb-4">Monthly Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/50">
              <span className="text-sm text-ink-soft">Approved Listings</span>
              <span className="font-display font-bold text-ink">{data.approved_listings || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/50">
              <span className="text-sm text-ink-soft">Sold Listings</span>
              <span className="font-display font-bold text-ink">{data.sold_listings || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/50">
              <span className="text-sm text-ink-soft">Milk This Month</span>
              <span className="font-display font-bold text-ink flex items-center gap-1"><Droplets size={14} className="text-primary" /> {data.milk_this_month || 0}L</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/50">
              <span className="text-sm text-ink-soft">Feed Cost</span>
              <span className="font-display font-bold text-danger">{formatCurrency(feedCost)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <span className="text-sm font-semibold text-ink">Net Profit</span>
              <span className={`font-display font-bold text-lg ${profit >= 0 ? 'text-primary' : 'text-danger'}`}>{formatCurrency(profit)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportPage;
