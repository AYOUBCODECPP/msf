import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Edit, Camera, Tag, Calendar, Heart, FileText,
  Syringe, Droplets, GitBranch, QrCode,
} from 'lucide-react';
import { getAnimal } from '../../api/animals';
import { SPECIES, ANIMAL_STATUS } from '../../utils/constants';
import { formatDate, calculateAge } from '../../utils/formatters';
import Badge from '../shared/Badge';
import LoadingSpinner from '../shared/LoadingSpinner';
import useLanguageStore from '../../store/languageStore';

const TAB_KEYS = [
  { id: 'general', labelKey: 'detail.tabGeneral', icon: FileText },
  { id: 'medications', labelKey: 'detail.tabMeds', icon: Syringe },
  { id: 'milk', labelKey: 'detail.tabMilk', icon: Droplets },
  { id: 'pedigree', labelKey: 'detail.tabPedigree', icon: GitBranch },
];

const AnimalDetailPage = () => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const { t, isRTL } = useLanguageStore();
  const rtl = isRTL();

  useEffect(() => {
    getAnimal(id)
      .then((resp) => setAnimal(resp.animal))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!animal) return <p className="text-ink-soft">{t('animals.noResults')}</p>;

  const speciesInfo = SPECIES[animal.species] || {};
  const images = animal.images || [];
  const statusVariant = { alive: 'success', for_sale: 'warning', sold: 'primary', deceased: 'danger' };
  const TABS = TAB_KEYS.map(tab => ({ ...tab, label: t(tab.labelKey) }));

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Back + Actions */}
      <div className={`flex items-center justify-between flex-wrap gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-2 text-ink-soft hover:text-ink transition-colors text-sm font-medium ${rtl ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft size={18} className={rtl ? 'rotate-180' : ''} /> {t('common.back')}
        </button>
        <div className={`flex items-center gap-2 flex-wrap ${rtl ? 'flex-row-reverse' : ''}`}>
          <Link
            to={`/dashboard/${section}/${id}/edit`}
            className={`neon-btn inline-flex items-center gap-1.5 text-sm ${rtl ? 'flex-row-reverse' : ''}`}
          >
            <Edit size={16} /> {t('animals.edit')}
          </Link>
          <Link
            to={`/dashboard/${section}/${id}/photos`}
            className={`neon-btn-outline inline-flex items-center gap-1.5 text-sm ${rtl ? 'flex-row-reverse' : ''}`}
          >
            <Camera size={16} /> {t('detail.photos')}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-1">
          <div className="premium-card overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-mint to-primary/10 overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[selectedImageIdx]?.image_url}
                  alt={animal.tag_id}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl opacity-30">
                  {speciesInfo.icon}
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-colors ${
                      idx === selectedImageIdx ? 'border-primary shadow-neon-green' : 'border-transparent'
                    }`}
                  >
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="premium-card p-6">
            <div className={`flex items-start justify-between mb-5 ${rtl ? 'flex-row-reverse' : ''}`}>
              <div className={rtl ? 'text-right' : 'text-left'}>
                <h1 className={`font-serif text-2xl font-bold text-ink flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                  {animal.tag_id}
                  <Badge variant={statusVariant[animal.status]}>
                    {t(`animals.status_${animal.status}`) || ANIMAL_STATUS[animal.status]?.label}
                  </Badge>
                </h1>
                <p className="text-ink-soft mt-1">
                  {speciesInfo.icon} {t(`species.${animal.species}`) || speciesInfo.label} — {animal.breed}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Tag, labelKey: 'animals.tagId', value: animal.tag_id },
                { icon: Calendar, labelKey: 'animals.age', value: calculateAge(animal.birth_date) },
                { icon: Heart, labelKey: 'animals.gender', value: animal.sex === 'male' ? t('animals.male') : t('animals.female') },
                { icon: QrCode, labelKey: 'detail.qrCode', value: t('animals.view'), isLink: true },
              ].map((item) => (
                <div key={item.labelKey} className={`p-3 rounded-2xl bg-surface flex items-start gap-2 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
                  <item.icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-ink-soft">{t(item.labelKey)}</p>
                    <p className={`text-sm font-medium ${item.isLink ? 'text-primary cursor-pointer hover:underline' : 'text-ink'}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="premium-card">
            <div className={`flex border-b border-gray-100 overflow-x-auto ${rtl ? 'flex-row-reverse' : ''}`}>
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${rtl ? 'flex-row-reverse' : ''} ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-ink-soft hover:text-ink'
                    }`}
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  {animal.description && (
                    <div className={`p-4 rounded-2xl bg-surface ${rtl ? 'text-right' : 'text-left'}`}>
                      <p className="text-xs text-ink-soft mb-1">{t('animals.name')}</p>
                      <p className="text-sm text-ink">{animal.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-2xl bg-surface ${rtl ? 'text-right' : 'text-left'}`}>
                      <p className="text-xs text-ink-soft mb-1">{t('health.diagnosis')}</p>
                      <p className="text-sm font-medium text-ink">{animal.health_status || '-'}</p>
                    </div>
                    <div className={`p-3 rounded-2xl bg-surface ${rtl ? 'text-right' : 'text-left'}`}>
                      <p className="text-xs text-ink-soft mb-1">{t('detail.birthDate')}</p>
                      <p className="text-sm font-medium text-ink">{formatDate(animal.birth_date)}</p>
                    </div>
                    {animal.sire && (
                      <div className={`p-3 rounded-2xl bg-surface ${rtl ? 'text-right' : 'text-left'}`}>
                        <p className="text-xs text-ink-soft mb-1">{t('detail.sire')}</p>
                        <Link to={`/dashboard/${animal.species}/${animal.sire.id}`} className="text-sm font-medium text-primary hover:underline">
                          {animal.sire.tag_id}
                        </Link>
                      </div>
                    )}
                    {animal.dam && (
                      <div className={`p-3 rounded-2xl bg-surface ${rtl ? 'text-right' : 'text-left'}`}>
                        <p className="text-xs text-ink-soft mb-1">{t('detail.dam')}</p>
                        <Link to={`/dashboard/${animal.species}/${animal.dam.id}`} className="text-sm font-medium text-primary hover:underline">
                          {animal.dam.tag_id}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'medications' && (
                <div>
                  {animal.medications?.length > 0 ? (
                    <div className="space-y-3">
                      {animal.medications.map((med) => (
                        <div key={med.id} className={`flex items-center justify-between p-4 rounded-2xl bg-surface ${rtl ? 'flex-row-reverse' : ''}`}>
                          <div className={rtl ? 'text-right' : 'text-left'}>
                            <p className="text-sm font-medium text-ink">{med.drug_name}</p>
                            <p className="text-xs text-ink-soft">{med.dosage} — {formatDate(med.given_at)}</p>
                          </div>
                          <Badge variant={med.effectiveness === 'effective' ? 'success' : med.effectiveness === 'ineffective' ? 'danger' : 'warning'}>
                            {med.effectiveness}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-ink-soft text-sm text-center py-8">{t('detail.noMedications')}</p>
                  )}
                </div>
              )}

              {activeTab === 'milk' && (
                <div>
                  {animal.milkRecords?.length > 0 ? (
                    <div className="space-y-2">
                      {animal.milkRecords.map((rec) => (
                        <div key={rec.id} className={`flex items-center justify-between p-4 rounded-2xl bg-surface ${rtl ? 'flex-row-reverse' : ''}`}>
                          <div className={rtl ? 'text-right' : 'text-left'}>
                            <p className="text-sm font-medium text-ink">{rec.liters} L</p>
                            <p className="text-xs text-ink-soft">{rec.session} — {formatDate(rec.recorded_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-ink-soft text-sm text-center py-8">{t('detail.noMilkRecords')}</p>
                  )}
                </div>
              )}

              {activeTab === 'pedigree' && (
                <div className="text-center py-12">
                  <GitBranch size={48} className="mx-auto text-ink-soft/30 mb-3" />
                  <p className="text-ink-soft text-sm">{t('detail.pedigreeHint')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
