import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Syringe } from 'lucide-react';
import { getAnimals } from '../../api/animals';
import { SPECIES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import Badge from '../shared/Badge';
import { TableSkeleton, EmptyState } from '../shared/States';
import gsap from 'gsap';

const VaccinationsPage = () => {
  const { section } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const speciesInfo = SPECIES[section] || {};

  useEffect(() => {
    setLoading(true);
    getAnimals({ species: section })
      .then((resp) => {
        const all = resp.animals?.data || [];
        const meds = [];
        all.forEach((animal) => {
          (animal.medications || []).forEach((med) => {
            meds.push({ ...med, animal_tag: animal.tag_id, animal_breed: animal.breed });
          });
        });
        setRecords(meds.sort((a, b) => new Date(b.given_at) - new Date(a.given_at)));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [section]);

  useEffect(() => {
    if (!loading && records.length) {
      gsap.fromTo('tr.vacc-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 });
    }
  }, [loading, records]);

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <span className="text-2xl">{speciesInfo.icon}</span>
          Vaccinations — {speciesInfo.label}
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">{records.length} medication records</p>
      </div>

      {records.length === 0 ? (
        <EmptyState icon={Syringe} title="No Vaccination Records" description="No medication or vaccination records found for this section." />
      ) : (
        <div className="page-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Animal</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Drug Name</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Dosage</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Date Given</th>
                <th className="text-left px-5 py-3 font-medium text-ink-soft">Effectiveness</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="vacc-row border-t border-border-light hover:bg-surface/30 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-display font-bold text-ink">{rec.animal_tag}</span>
                    <span className="text-ink-muted text-xs ml-2">{rec.animal_breed}</span>
                  </td>
                  <td className="px-5 py-3 text-ink font-medium">{rec.drug_name}</td>
                  <td className="px-5 py-3 text-ink-soft">{rec.dosage}</td>
                  <td className="px-5 py-3 text-ink-soft">{formatDate(rec.given_at)}</td>
                  <td className="px-5 py-3">
                    <Badge variant={rec.effectiveness === 'effective' ? 'success' : rec.effectiveness === 'ineffective' ? 'danger' : 'warning'}>
                      {rec.effectiveness}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VaccinationsPage;
