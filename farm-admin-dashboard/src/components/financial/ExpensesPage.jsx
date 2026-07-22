import { useEffect, useState } from 'react';
import { Receipt, DollarSign } from 'lucide-react';
import { getFeedRecords } from '../../api/feedRecords';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { TableSkeleton, EmptyState } from '../shared/States';
import gsap from 'gsap';

const ExpensesPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFeedRecords()
      .then((resp) => setRecords(resp.feed_records?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && records.length) {
      gsap.fromTo('tr.exp-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 });
    }
  }, [loading, records]);

  if (loading) return <TableSkeleton />;

  const totalCost = records.reduce((sum, r) => sum + (parseFloat(r.total_cost) || parseFloat(r.cost) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <Receipt size={22} className="text-danger" /> Expenses
          </h1>
          <p className="text-ink-soft text-sm mt-0.5">Feed and operational costs</p>
        </div>
        <div className="page-card px-5 py-3 flex items-center gap-3">
          <DollarSign size={18} className="text-danger" />
          <div>
            <p className="text-[11px] text-ink-soft">Total Expenses</p>
            <p className="text-lg font-bold font-display text-ink">{formatCurrency(totalCost)}</p>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <EmptyState icon={Receipt} title="No Expense Records" description="Feed and expense records will appear here once added." />
      ) : (
        <div className="page-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Feed Type</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Quantity</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Unit Cost</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Total Cost</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="exp-row border-t border-border-light hover:bg-surface/30 transition-colors">
                  <td className="px-5 py-3 font-display font-bold text-ink">{rec.feed_type || rec.type || '—'}</td>
                  <td className="px-5 py-3 text-ink-soft">{rec.quantity} {rec.unit || 'kg'}</td>
                  <td className="px-5 py-3 text-ink-soft">{formatCurrency(rec.unit_cost || 0)}</td>
                  <td className="px-5 py-3 font-semibold text-danger">{formatCurrency(rec.total_cost || rec.cost || 0)}</td>
                  <td className="px-5 py-3 text-ink-soft">{formatDate(rec.recorded_at || rec.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
