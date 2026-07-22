import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Search, Grid3X3, List, Eye } from 'lucide-react';
import { getAnimals } from '../../api/animals';
import { SPECIES, SUB_CATEGORIES, ANIMAL_STATUS } from '../../utils/constants';
import { calculateAge } from '../../utils/formatters';
import Badge from '../shared/Badge';
import LoadingSpinner from '../shared/LoadingSpinner';
import useLanguageStore from '../../store/languageStore';
import gsap from 'gsap';

const AnimalCard = ({ animal, tFn, rtl }) => {
  const primaryImage = animal.images?.find((img) => img.is_primary) || animal.images?.[0];
  const statusVariant = { alive: 'success', for_sale: 'warning', sold: 'primary', deceased: 'danger' };

  return (
    <Link
      to={`/dashboard/${animal.species}/${animal.id}`}
      className="premium-card relative group"
    >
      <div className="h-48 bg-gradient-to-br from-mint to-primary/10 overflow-hidden relative">
        {primaryImage ? (
          <img
            src={primaryImage.image_url}
            alt={animal.tag_id}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-40">
            {SPECIES[animal.species]?.icon || '🐾'}
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 bg-neon text-ink rounded-full text-sm font-semibold shadow-neon">
            {tFn('animals.view')}
          </span>
        </div>
      </div>
      <div className={`p-4 ${rtl ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between mb-2 ${rtl ? 'flex-row-reverse' : ''}`}>
          <h3 className="font-serif font-bold text-ink">{animal.tag_id}</h3>
          <Badge variant={statusVariant[animal.status]}>
            {tFn(`animals.status_${animal.status}`) || ANIMAL_STATUS[animal.status]?.label || animal.status}
          </Badge>
        </div>
        <div className={`flex items-center gap-2 text-xs text-ink-soft ${rtl ? 'flex-row-reverse' : ''}`}>
          <span className="capitalize">{animal.sex === 'male' ? tFn('animals.male') : tFn('animals.female')}</span>
          <span className="w-1 h-1 bg-ink-soft/30 rounded-full" />
          <span>{calculateAge(animal.birth_date)}</span>
          <span className="w-1 h-1 bg-ink-soft/30 rounded-full" />
          <span>{animal.breed}</span>
        </div>
      </div>
    </Link>
  );
};

const FILTER_MAP = {
  males: (a) => a.sex === 'male',
  females: (a) => a.sex === 'female',
  young: (a) => {
    const youngCategories = ['lamb', 'calf', 'kid', 'heifer'];
    return youngCategories.includes(a.sub_category) || a.is_young;
  },
  pregnant: (a) => a.is_pregnant || a.pregnancy_status === 'pregnant',
};

// Map English tab keys to translation keys
const TAB_KEY_MAP = {
  'All': 'cat_All',
  'Calves': 'cat_Calves',
  'Heifers': 'cat_Heifers',
  'Dairy Cows': 'cat_Dairy_Cows',
  'Bulls': 'cat_Bulls',
  'Lambs': 'cat_Lambs',
  'Ewes': 'cat_Ewes',
  'Rams': 'cat_Rams',
  'Kids': 'cat_Kids',
  'Does': 'cat_Does',
  'Bucks': 'cat_Bucks',
};

const SectionPage = ({ filter }) => {
  const { section } = useParams();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const { t, isRTL } = useLanguageStore();
  const rtl = isRTL();

  const speciesInfo = SPECIES[section] || {};
  const tabs = SUB_CATEGORIES[section] || ['All'];

  useEffect(() => {
    setLoading(true);
    getAnimals({ species: section, search: search || undefined })
      .then((resp) => setAnimals(resp.animals?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [section, search]);

  useEffect(() => {
    if (animals.length) {
      gsap.fromTo(
        '.animal-card',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [animals]);

  let filteredAnimals = activeTab === 'All'
    ? animals
    : animals.filter((a) => {
        const catMap = {
          Calves: 'calf', Heifers: 'heifer', 'Dairy Cows': 'dairy_cow', Bulls: 'bull',
          Lambs: 'lamb', Ewes: 'ewe', Rams: 'ram',
          Kids: 'kid', Does: 'doe', Bucks: 'buck',
        };
        return a.sub_category === catMap[activeTab];
      });

  if (filter && FILTER_MAP[filter]) {
    filteredAnimals = filteredAnimals.filter(FILTER_MAP[filter]);
  }

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${rtl ? 'sm:flex-row-reverse' : ''}`}>
        <div className={rtl ? 'text-right' : 'text-left'}>
          <h1 className={`font-serif text-2xl font-bold text-ink flex items-center gap-2 ${rtl ? 'flex-row-reverse' : ''}`}>
            <span className="text-3xl">{speciesInfo.icon}</span>
            {t(`species.${section}`) || speciesInfo.label}
            <span className="text-base font-normal text-ink-soft">({animals.length})</span>
          </h1>
        </div>
        <Link
          to={`/dashboard/${section}/new`}
          className={`neon-btn inline-flex items-center gap-2 text-sm ${rtl ? 'flex-row-reverse' : ''}`}
        >
          <Plus size={18} />
          {t('animals.registerNew')}
        </Link>
      </div>

      {/* Tabs */}
      <div className={`flex items-center gap-2 flex-wrap ${rtl ? 'flex-row-reverse' : ''}`}>
        {tabs.map((tab) => {
          const tabKey = TAB_KEY_MAP[tab];
          const tabLabel = tabKey ? t(`animals.${tabKey}`) : tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-neon-green'
                  : 'bg-white text-ink-soft border border-gray-200 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      {/* Search + View Toggle */}
      <div className={`flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-ink-soft/50 ${rtl ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('animals.searchPlaceholder')}
            className={`neon-input ${rtl ? 'pr-10 text-right' : 'pl-10'}`}
          />
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-ink-soft hover:bg-surface'}`}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-ink-soft hover:bg-surface'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Animals Grid */}
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : filteredAnimals.length === 0 ? (
        <div className="premium-card p-16 text-center">
          <div className="text-5xl mb-4 opacity-30">{speciesInfo.icon}</div>
          <p className="font-serif text-lg font-bold text-ink">{t('animals.noAnimalsFound')}</p>
          <p className="text-ink-soft text-sm mt-1">{t('animals.startRegister')}</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAnimals.map((animal) => (
            <div key={animal.id} className="animal-card">
              <AnimalCard animal={animal} tFn={t} rtl={rtl} />
            </div>
          ))}
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <table className="w-full text-sm" dir={rtl ? 'rtl' : 'ltr'}>
            <thead className="bg-surface">
              <tr>
                <th className={`px-5 py-3 font-medium text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{t('animals.tagId')}</th>
                <th className={`px-5 py-3 font-medium text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{t('animals.gender')}</th>
                <th className={`px-5 py-3 font-medium text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{t('animals.age')}</th>
                <th className={`px-5 py-3 font-medium text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>Race / Breed</th>
                <th className={`px-5 py-3 font-medium text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{t('animals.status')}</th>
                <th className={`px-5 py-3 font-medium text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{t('animals.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnimals.map((animal) => (
                <tr key={animal.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                  <td className={`px-5 py-3 font-serif font-bold text-ink ${rtl ? 'text-right' : 'text-left'}`}>{animal.tag_id}</td>
                  <td className={`px-5 py-3 text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>
                    {animal.sex === 'male' ? t('animals.male') : t('animals.female')}
                  </td>
                  <td className={`px-5 py-3 text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{calculateAge(animal.birth_date)}</td>
                  <td className={`px-5 py-3 text-ink-soft ${rtl ? 'text-right' : 'text-left'}`}>{animal.breed}</td>
                  <td className={`px-5 py-3 ${rtl ? 'text-right' : 'text-left'}`}>
                    <Badge variant={animal.status === 'alive' ? 'success' : animal.status === 'for_sale' ? 'warning' : animal.status === 'deceased' ? 'danger' : 'primary'}>
                      {t(`animals.status_${animal.status}`) || ANIMAL_STATUS[animal.status]?.label}
                    </Badge>
                  </td>
                  <td className={`px-5 py-3 ${rtl ? 'text-right' : 'text-left'}`}>
                    <Link
                      to={`/dashboard/${animal.species}/${animal.id}`}
                      className={`inline-flex items-center gap-1 text-primary hover:text-primary-dark font-semibold text-sm ${rtl ? 'flex-row-reverse' : ''}`}
                    >
                      <Eye size={16} /> {t('animals.view')}
                    </Link>
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

export default SectionPage;

