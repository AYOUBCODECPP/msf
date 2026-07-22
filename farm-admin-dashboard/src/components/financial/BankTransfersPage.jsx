import { ArrowRightLeft } from 'lucide-react';
import { EmptyState } from '../shared/States';

const BankTransfersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <ArrowRightLeft size={22} className="text-primary" /> Bank Transfers
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">Export and manage bank transfer records</p>
      </div>
      <EmptyState
        icon={ArrowRightLeft}
        title="Bank Transfers Coming Soon"
        description="Bank transfer tracking and export functionality will be available in a future update."
      />
    </div>
  );
};

export default BankTransfersPage;
