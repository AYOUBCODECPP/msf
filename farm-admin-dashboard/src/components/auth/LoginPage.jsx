import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Sprout } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'super_admin') navigate('/dashboard');
      else navigate(`/dashboard/${user.role}/overview`);
    } catch {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink via-ink to-primary-dark relative overflow-hidden">
      {/* Decorative bg shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-neon/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-3xl" />
      </div>

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>

      <div className={`relative z-10 w-full max-w-md mx-4 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-neon shadow-neon mx-auto mb-4 flex items-center justify-center">
            <Sprout size={32} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">FarmAdmin</h1>
          <p className="text-white/50 text-sm mt-1">FermeNeon Management Dashboard</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/10">
          <h2 className="font-display text-xl font-bold text-ink mb-1">Welcome back</h2>
          <p className="text-ink-soft text-sm mb-6">Sign in to manage your farm</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-soft mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" placeholder="admin@ferme-neon.fr" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-soft mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field pr-12" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink-soft transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-border-light text-center">
            <p className="text-xs text-ink-muted">Demo: <span className="font-medium text-ink">admin@ferme-neon.fr</span> / <span className="font-medium text-ink">admin123</span></p>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">FARME — Livestock Management System</p>
      </div>
    </div>
  );
};

export default LoginPage;
