import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { getAnimals } from '../../api/animals';
import { SPECIES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import Badge from '../shared/Badge';
import { TableSkeleton, EmptyState } from '../shared/States';
import gsap from 'gsap';

const SickPage = () => {
  const { section } = useParams();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const speciesInfo = SPECIES[section] || {};

  useEffect(() => {
    setLoading(true);
    getAnimals({ species: section })
      .then((resp) => {
        const all = resp.animals?.data || [];
        setAnimals(all.filter((a) => a.health_status === 'Needs monitoring' || a.health_status === 'Sick'));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [section]);

  useEffect(() => {
    if (!loading && animals.length) {
      gsap.fromTo('tr.sick-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 });
    }
  }, [loading, animals]);

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <span className="text-2xl">{speciesInfo.icon}</span>
          Sick {speciesInfo.label}
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">{animals.length} animals needing attention</p>
      </div>

      {animals.length === 0 ? (
        <EmptyState icon={Stethoscope} title="No Sick Animals" description={`All ${section} are in good health.`} />
      ) : (
        <div className="page-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Tag ID</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Breed</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Sex</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Health Status</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Last Medication</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Effectiveness</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => {
                const lastMed = animal.medications?.[0];
                return (
                  <tr key={animal.id} className="sick-row border-t border-border-light hover:bg-surface/30 transition-colors">
                    <td className="px-5 py-3 font-display font-bold text-ink">{animal.tag_id}</td>
                    <td className="px-5 py-3 text-ink-soft">{animal.breed}</td>
                    <td className="px-5 py-3 text-ink-soft capitalize">{animal.sex}</td>
                    <td className="px-5 py-3">
                      <Badge variant={animal.health_status === 'Sick' ? 'danger' : 'warning'}>
                        {animal.health_status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-ink-soft">
                      {lastMed ? `${lastMed.drug_name} — ${formatDate(lastMed.given_at)}` : 'None'}
                    </td>
                    <td className="px-5 py-3">
                      {lastMed ? (
                        <Badge variant={lastMed.effectiveness === 'effective' ? 'success' : lastMed.effectiveness === 'ineffective' ? 'danger' : 'warning'}>
                          {lastMed.effectiveness}
                        </Badge>
                      ) : (
                        <span className="text-ink-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SickPage;
