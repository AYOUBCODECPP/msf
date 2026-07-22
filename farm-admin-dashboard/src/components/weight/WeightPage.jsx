import { useParams } from 'react-router-dom';
import { Weight } from 'lucide-react';
import { SPECIES } from '../../utils/constants';
import { EmptyState } from '../shared/States';

const WeightPage = () => {
  const { section } = useParams();
  const speciesInfo = SPECIES[section] || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <span className="text-2xl">{speciesInfo.icon}</span>
          Weight Tracking — {speciesInfo.label}
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">Monitor weight progression over time</p>
      </div>

      <EmptyState
        icon={Weight}
        title="Weight Tracking Coming Soon"
        description="Weight recording and charting will be available in a future update."
      />
    </div>
  );
};

export default WeightPage;
