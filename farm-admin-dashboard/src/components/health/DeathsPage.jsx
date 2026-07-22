import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skull } from 'lucide-react';
import { getAnimals } from '../../api/animals';
import { SPECIES } from '../../utils/constants';
import { formatDate, calculateAge } from '../../utils/formatters';
import Badge from '../shared/Badge';
import { TableSkeleton, EmptyState } from '../shared/States';
import gsap from 'gsap';

const DeathsPage = () => {
  const { section } = useParams();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const speciesInfo = SPECIES[section] || {};

  useEffect(() => {
    setLoading(true);
    getAnimals({ species: section, status: 'deceased' })
      .then((resp) => setAnimals(resp.animals?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [section]);

  useEffect(() => {
    if (!loading && animals.length) {
      gsap.fromTo('tr.death-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 });
    }
  }, [loading, animals]);

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <span className="text-2xl">{speciesInfo.icon}</span>
          {speciesInfo.label} Deaths
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">{animals.length} deceased {section} recorded</p>
      </div>

      {animals.length === 0 ? (
        <EmptyState icon={Skull} title="No Deaths Recorded" description={`No deceased ${section} found. This is good news!`} />
      ) : (
        <div className="page-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Tag ID</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Breed</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Sex</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Age at Death</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Cause</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Date</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id} className="death-row border-t border-border-light hover:bg-surface/30 transition-colors">
                  <td className="px-5 py-3 font-display font-bold text-ink">{animal.tag_id}</td>
                  <td className="px-5 py-3 text-ink-soft">{animal.breed}</td>
                  <td className="px-5 py-3 text-ink-soft capitalize">{animal.sex}</td>
                  <td className="px-5 py-3 text-ink-soft">{calculateAge(animal.birth_date)}</td>
                  <td className="px-5 py-3">
                    <Badge variant="danger">{animal.death_record?.cause || 'Unknown'}</Badge>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{formatDate(animal.death_record?.recorded_at || animal.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeathsPage;
