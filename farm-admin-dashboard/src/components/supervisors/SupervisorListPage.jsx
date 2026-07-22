import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/users';
import Modal from '../shared/Modal';
import ConfirmDialog from '../shared/ConfirmDialog';
import LoadingSpinner from '../shared/LoadingSpinner';
import gsap from 'gsap';

const SupervisorForm = ({ supervisor, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: supervisor?.name || '',
    email: supervisor?.email || '',
    password: '',
    role: supervisor?.role || 'cattle',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      if (supervisor) {
        await updateUser(supervisor.id, payload);
      } else {
        await createUser(payload);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">{error}</div>
      )}
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-1.5">Name</label>
        <input type="text" value={form.name} required onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="neon-input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-1.5">Email</label>
        <input type="email" value={form.email} required onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="neon-input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-1.5">
          {supervisor ? 'New Password (leave blank to keep)' : 'Password'}
        </label>
        <input type="password" value={form.password} required={!supervisor} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} className="neon-input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-1.5">Section</label>
        <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className="neon-input">
          <option value="cattle">🐄 Cattle</option>
          <option value="sheep">🐑 Sheep</option>
          <option value="goat">🐐 Goat</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="neon-btn-outline text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="neon-btn text-sm">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

const SupervisorListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadUsers = () => {
    setLoading(true);
    getUsers().then((resp) => setUsers(resp.users || [])).finally(() => setLoading(false));
  };

  useEffect(() => { loadUsers(); }, []);

  useEffect(() => {
    if (users.length) gsap.fromTo('tr.user-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 });
  }, [users]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteUser(deleteTarget.id);
    setDeleteTarget(null);
    loadUsers();
  };

  const sectionLabels = { cattle: '🐄 Cattle', sheep: '🐑 Sheep', goat: '🐐 Goat', super_admin: '⭐ Admin' };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-ink">Supervisors</h1>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="neon-btn inline-flex items-center gap-2 text-sm"
        >
          <Plus size={18} /> Add Supervisor
        </button>
      </div>

      <div className="premium-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-ink-soft">Name</th>
              <th className="text-left px-5 py-3 font-medium text-ink-soft">Email</th>
              <th className="text-left px-5 py-3 font-medium text-ink-soft">Section</th>
              <th className="text-left px-5 py-3 font-medium text-ink-soft">Status</th>
              <th className="text-right px-5 py-3 font-medium text-ink-soft">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((u) => u.role !== 'buyer').map((user) => (
              <tr key={user.id} className="user-row border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="px-5 py-3 font-serif font-bold text-ink">{user.name}</td>
                <td className="px-5 py-3 text-ink-soft">{user.email}</td>
                <td className="px-5 py-3 text-ink-soft">{sectionLabels[user.role] || user.role}</td>
                <td className="px-5 py-3">
                  <span className={`neon-badge ${user.is_suspended ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                    {user.is_suspended ? 'Suspended' : 'Active'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setEditing(user); setFormOpen(true); }} className="p-2 rounded-xl hover:bg-primary/10 text-ink-soft hover:text-primary transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => setDeleteTarget(user)} className="p-2 rounded-xl hover:bg-danger/10 text-ink-soft hover:text-danger transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={editing ? 'Edit Supervisor' : 'Add Supervisor'}>
        <SupervisorForm supervisor={editing} onClose={() => setFormOpen(false)} onSave={() => { setFormOpen(false); loadUsers(); }} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Supervisor"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default SupervisorListPage;
