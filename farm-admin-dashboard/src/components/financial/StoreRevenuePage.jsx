import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { getListings } from '../../api/saleListings';
import { SPECIES } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { TableSkeleton, EmptyState } from '../shared/States';
import gsap from 'gsap';

const StoreRevenuePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getListings({ status: 'sold' })
      .then((resp) => setListings(resp.listings?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && listings.length) {
      gsap.fromTo('tr.rev-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 });
    }
  }, [loading, listings]);

  if (loading) return <TableSkeleton />;

  const totalRevenue = listings.reduce((sum, l) => sum + (parseFloat(l.price) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <TrendingUp size={22} className="text-primary" /> Store Revenue
          </h1>
          <p className="text-ink-soft text-sm mt-0.5">Revenue from approved &amp; sold listings</p>
        </div>
        <div className="page-card px-5 py-3 flex items-center gap-3">
          <DollarSign size={18} className="text-primary" />
          <div>
            <p className="text-[11px] text-ink-soft">Total Revenue</p>
            <p className="text-lg font-bold font-display text-ink">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>
      </div>

      {listings.length === 0 ? (
        <EmptyState icon={TrendingUp} title="No Sold Listings" description="Revenue will appear here once listings are sold." />
      ) : (
        <div className="page-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Animal</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Species</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Price</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Status</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Date</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="rev-row border-t border-border-light hover:bg-surface/30 transition-colors">
                  <td className="px-5 py-3 font-display font-bold text-ink">{listing.animal?.tag_id || '—'}</td>
                  <td className="px-5 py-3 text-ink-soft">{SPECIES[listing.animal?.species]?.icon} {SPECIES[listing.animal?.species]?.label}</td>
                  <td className="px-5 py-3 font-semibold text-primary">{formatCurrency(listing.price)}</td>
                  <td className="px-5 py-3"><span className="badge bg-primary/10 text-primary-dark capitalize">{listing.status}</span></td>
                  <td className="px-5 py-3 text-ink-soft">{formatDate(listing.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoreRevenuePage;
