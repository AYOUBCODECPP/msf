import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getOverview, getSectionStats, getSalesStats } from '../../api/analytics';
import { SPECIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import LoadingSpinner from '../shared/LoadingSpinner';
import gsap from 'gsap';

const AnalyticsPage = () => {
  const [overview, setOverview] = useState(null);
  const [sectionData, setSectionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getOverview(),
      getSectionStats('cattle'),
      getSectionStats('sheep'),
      getSectionStats('goat'),
    ])
      .then(([ov, c, s, g]) => {
        setOverview(ov);
        setSectionData({ cattle: c, sheep: s, goat: g });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo('.stat-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 });
    }
  }, [loading]);

  if (loading) return <LoadingSpinner size="lg" />;

  const comparisonData = Object.entries(sectionData).map(([species, data]) => ({
    name: SPECIES[species]?.label || species,
    live: data.live || 0,
    for_sale: data.for_sale || 0,
    sold: data.sold || 0,
    deceased: data.deceased || 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-ink">Analytics</h1>
        <p className="text-ink-soft text-sm mt-1">Comprehensive farm analytics across all sections</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: BarChart3, label: 'Total Revenue', value: formatCurrency(overview?.revenue || 0), color: 'bg-primary' },
          { icon: TrendingUp, label: 'Approved Listings', value: overview?.approved_listings || 0, color: 'bg-neon-green' },
          { icon: Package, label: 'Sold Listings', value: overview?.sold_listings || 0, color: 'bg-neon' },
          { icon: DollarSign, label: 'Mortality Rate', value: `${overview?.mortality_rate || 0}%`, color: 'bg-danger' },
        ].map((stat, i) => (
          <div key={i} className="stat-card kpi-card">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-ink-soft">{stat.label}</p>
                <p className="text-xl font-bold font-serif text-ink mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="premium-card p-6">
          <h3 className="font-serif text-base font-bold text-ink mb-5">Section Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#4A6B5A' }} />
              <YAxis tick={{ fontSize: 12, fill: '#4A6B5A' }} />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 10px 30px rgba(6,35,26,0.1)' }} />
              <Bar dataKey="live" fill="#00C853" radius={[6, 6, 0, 0]} name="Live" />
              <Bar dataKey="for_sale" fill="#00E5FF" radius={[6, 6, 0, 0]} name="For Sale" />
              <Bar dataKey="deceased" fill="#EF4444" radius={[6, 6, 0, 0]} name="Deceased" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card p-6">
          <h3 className="font-serif text-base font-bold text-ink mb-5">Medication Effectiveness</h3>
          <div className="space-y-4">
            {Object.entries(sectionData).map(([species, data]) => (
              <div key={species} className="p-4 rounded-2xl bg-surface">
                <h4 className="font-serif font-bold text-ink mb-2">{SPECIES[species]?.icon} {SPECIES[species]?.label}</h4>
                {data.medication_effectiveness && Object.keys(data.medication_effectiveness).length > 0 ? (
                  <div className="space-y-1.5">
                    {Object.entries(data.medication_effectiveness).map(([eff, count]) => (
                      <div key={eff} className="flex justify-between text-sm">
                        <span className="text-ink-soft capitalize">{eff}</span>
                        <span className="font-medium text-ink">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ink-soft">No data available</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
