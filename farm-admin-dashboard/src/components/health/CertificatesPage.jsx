import { useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { SPECIES } from '../../utils/constants';
import { EmptyState } from '../shared/States';

const CertificatesPage = () => {
  const { section } = useParams();
  const speciesInfo = SPECIES[section] || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <span className="text-2xl">{speciesInfo.icon}</span>
          Medical Certificates — {speciesInfo.label}
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">Health and medical certificates for your {section}</p>
      </div>

      <EmptyState
        icon={FileText}
        title="Certificates Coming Soon"
        description="Medical certificate generation and management will be available in a future update."
      />
    </div>
  );
};

export default CertificatesPage;
