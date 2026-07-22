import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Star } from 'lucide-react';
import { getAnimal, uploadAnimalImages } from '../../api/animals';
import { SPECIES } from '../../utils/constants';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useEffect } from 'react';

const PhotosPage = () => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const speciesInfo = SPECIES[section] || {};

  const loadAnimal = () => {
    getAnimal(id)
      .then(({ data }) => setAnimal(data.data || data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadAnimal(); }, [id]);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append('images[]', file);
      }
      await uploadAnimalImages(id, formData);
      loadAnimal();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;
  if (!animal) return <p className="text-ink-soft">Animal not found.</p>;

  const images = animal.images || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/dashboard/${section}/${id}`)}
          className="inline-flex items-center gap-2 text-ink-soft hover:text-ink transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} /> Back to {animal.tag_id}
        </button>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary text-sm"
          >
            <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Photos'}
          </button>
        </div>
      </div>

      <div>
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <span className="text-2xl">{speciesInfo.icon}</span>
          Photos — {animal.tag_id}
        </h1>
        <p className="text-ink-soft text-sm mt-0.5">{images.length} photo{images.length !== 1 ? 's' : ''}</p>
      </div>

      {images.length === 0 ? (
        <div className="page-card p-16 text-center">
          <div className="text-5xl mb-4 opacity-30">{speciesInfo.icon}</div>
          <p className="font-display text-lg font-bold text-ink">No Photos Yet</p>
          <p className="text-ink-soft text-sm mt-1">Upload photos to document this animal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="page-card overflow-hidden group relative">
              <div className="aspect-square bg-surface">
                <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              </div>
              {img.is_primary && (
                <div className="absolute top-2 left-2">
                  <span className="badge bg-primary text-white text-[10px] flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Primary
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
