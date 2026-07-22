import { Banknote } from 'lucide-react';
import { EmptyState } from '../shared/States';

const OfflineSalesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Banknote size={22} className="text-primary" /> Offline Sales
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">Track sales completed outside the store</p>
      </div>
      <EmptyState
        icon={Banknote}
        title="Offline Sales Coming Soon"
        description="Recording and managing offline (in-person) sales will be available in a future update."
      />
    </div>
  );
};

export default OfflineSalesPage;
