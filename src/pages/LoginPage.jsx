import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Lock, Mail, ArrowRight, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginAsDemoUser();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Demo login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] flex items-center justify-center p-4 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-md w-full glass-panel bg-[#0b0f19]/90 border border-white/15 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              SkillGap<span className="text-indigo-400">.AI</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Enter your credentials to access career simulations</p>
        </div>

        {/* Quick Demo Mode Banner for Hackathon Reviewers */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 via-cyan-900/30 to-indigo-900/40 border border-indigo-500/30 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-cyan-300 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>HACKATHON EVALUATOR SHORTCUT</span>
          </div>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Instant Demo Account Login</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[11px] text-slate-500 uppercase tracking-wider">Or email login</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Workspace"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
