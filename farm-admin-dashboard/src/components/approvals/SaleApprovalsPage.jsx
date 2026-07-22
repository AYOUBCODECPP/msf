import { useEffect, useState } from 'react';
import { Check, X as XIcon, CheckCircle } from 'lucide-react';
import { getPendingListings, approveListing } from '../../api/saleListings';
import { formatCurrency } from '../../utils/formatters';
import { SPECIES } from '../../utils/constants';
import LoadingSpinner from '../shared/LoadingSpinner';
import gsap from 'gsap';

const SaleApprovalsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const loadPending = () => {
    setLoading(true);
    getPendingListings()
      .then((resp) => setListings(resp.listings || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPending(); }, []);

  const handleApprove = async (id) => {
    await approveListing(id, { action: 'approve' });
    const card = document.getElementById(`listing-${id}`);
    if (card) {
      gsap.to(card, { opacity: 0, x: 50, height: 0, marginBottom: 0, padding: 0, duration: 0.4, onComplete: () => loadPending() });
    } else {
      loadPending();
    }
  };

  const handleReject = async (id) => {
    await approveListing(id, { action: 'reject', rejection_reason: rejectReason });
    setRejectingId(null);
    setRejectReason('');
    loadPending();
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-ink">Sale Approvals</h1>
        <p className="text-ink-soft text-sm mt-1">
          {listings.length} pending {listings.length === 1 ? 'request' : 'requests'}
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="premium-card p-16 text-center">
          <CheckCircle size={48} className="mx-auto text-primary mb-4" />
          <p className="font-serif text-lg font-bold text-ink">All caught up!</p>
          <p className="text-ink-soft text-sm mt-1">No pending sale listings to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((listing) => (
            <div key={listing.id} id={`listing-${listing.id}`} className="premium-card relative overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-mint to-primary/10 overflow-hidden">
                {listing.animal?.images?.[0] ? (
                  <img src={listing.animal.images[0].image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
                    {SPECIES[listing.animal?.species]?.icon || '🐾'}
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-ink">{listing.animal?.tag_id}</h3>
                  <p className="text-xs text-ink-soft">
                    {SPECIES[listing.animal?.species]?.label} — {listing.animal?.breed}
                  </p>
                </div>
                <p className="text-xl font-bold font-serif text-primary">{formatCurrency(listing.price)}</p>
                {listing.marketing_description && (
                  <p className="text-xs text-ink-soft line-clamp-2">{listing.marketing_description}</p>
                )}
                <div className="flex gap-2 pt-1">
                  <button onClick={() => handleApprove(listing.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark hover:shadow-neon-green transition-all">
                    <Check size={16} /> Approve
                  </button>
                  <button onClick={() => setRejectingId(listing.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border-2 border-danger/20 text-danger text-sm font-semibold hover:bg-danger/5 transition-all">
                    <XIcon size={16} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4" onClick={() => setRejectingId(null)}>
          <div className="w-full max-w-md premium-card !rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-bold text-ink mb-3">Reject Listing</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Reason for rejection (optional)"
              className="neon-input resize-none mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setRejectingId(null)} className="neon-btn-outline text-sm">Cancel</button>
              <button onClick={() => handleReject(rejectingId)} className="neon-btn-danger text-sm">Confirm Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleApprovalsPage;
