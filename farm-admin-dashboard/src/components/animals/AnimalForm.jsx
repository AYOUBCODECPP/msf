import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createAnimal } from '../../api/animals';
import { SPECIES, SEX_OPTIONS } from '../../utils/constants';

const AnimalForm = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    species: section,
    tag_id: '',
    sex: 'female',
    birth_date: '',
    breed: '',
    sire_id: '',
    dam_id: '',
    description: '',
    health_status: 'Healthy',
  });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form };
      if (!payload.sire_id) delete payload.sire_id;
      if (!payload.dam_id) delete payload.dam_id;
      await createAnimal(payload);
      navigate(`/dashboard/${section}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create animal');
    } finally {
      setLoading(false);
    }
  };

  const speciesInfo = SPECIES[section] || {};

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-ink-soft hover:text-ink transition-colors text-sm font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="premium-card p-6">
        <h1 className="font-serif text-xl font-bold text-ink mb-1">
          Register New {speciesInfo.label} {speciesInfo.icon}
        </h1>
        <p className="text-ink-soft text-sm mb-6">
          Fill in the details below to register a new animal.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Tag ID</label>
              <input
                type="text"
                value={form.tag_id}
                onChange={(e) => handleChange('tag_id', e.target.value)}
                required
                className="neon-input"
                placeholder="e.g., CTL-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Breed</label>
              <input
                type="text"
                value={form.breed}
                onChange={(e) => handleChange('breed', e.target.value)}
                required
                className="neon-input"
                placeholder="e.g., Holstein"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Sex</label>
              <div className="flex gap-2">
                {SEX_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleChange('sex', opt.value)}
                    className={`flex-1 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                      form.sex === opt.value
                        ? 'bg-primary text-white border-primary shadow-neon-green'
                        : 'bg-white border-gray-200 text-ink-soft hover:border-primary/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Birth Date</label>
              <input
                type="date"
                value={form.birth_date}
                onChange={(e) => handleChange('birth_date', e.target.value)}
                required
                className="neon-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Health Status</label>
              <select
                value={form.health_status}
                onChange={(e) => handleChange('health_status', e.target.value)}
                className="neon-input"
              >
                <option value="Healthy">Healthy</option>
                <option value="Needs monitoring">Needs monitoring</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Sire ID (Father)</label>
              <input
                type="text"
                value={form.sire_id}
                onChange={(e) => handleChange('sire_id', e.target.value)}
                className="neon-input"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">Dam ID (Mother)</label>
              <input
                type="text"
                value={form.dam_id}
                onChange={(e) => handleChange('dam_id', e.target.value)}
                className="neon-input"
                placeholder="Optional"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="neon-input resize-none"
              placeholder="Additional notes..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="neon-btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="neon-btn flex items-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Saving...' : 'Save Animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalForm;
