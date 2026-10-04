import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  Key, 
  CheckCircle2, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Moon,
  Bell
} from 'lucide-react';

export default function SettingsPage() {
  const { logout } = useAuth();

  const [geminiKey, setGeminiKey] = useState(
    localStorage.getItem('skillgap_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY || ''
  );
  const [savedKeyMsg, setSavedKeyMsg] = useState('');

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (geminiKey.trim()) {
      localStorage.setItem('skillgap_gemini_key', geminiKey.trim());
      setSavedKeyMsg('Gemini API Key saved successfully! Live Gemini 2.5 AI active.');
    } else {
      localStorage.removeItem('skillgap_gemini_key');
      setSavedKeyMsg('Gemini Key cleared. Platform will use intelligent fallback mode.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white">SETTINGS & CONFIGURATION</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Configure Google Gemini AI API credentials, authentication state, and workspace preferences.
            </p>
          </div>

          {/* Settings Grid */}
          <div className="space-y-6 max-w-3xl">
            
            {/* 1. Gemini AI Key Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Google Gemini API Key</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your custom Google Gemini API Key for live AI workplace scenario generation and evidence-based evaluation. If omitted, SkillGap AI operates using standard environment credentials or fallback engine.
              </p>

              {savedKeyMsg && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{savedKeyMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveKey} className="space-y-3">
                <div>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-400">Status: {geminiKey ? "Key Configured" : "Standard Fallback"}</span>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Save API Key
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Platform Security & Data Isolation */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Security & Cloud Isolation</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Firebase Firestore rules ensure user simulation records and personal evaluations are strictly scoped per user ID. Cross-account data exposure is prevented.
              </p>
            </div>

            {/* 3. Account Sign Out */}
            <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-rose-950/10 space-y-4">
              <h3 className="text-base font-bold text-rose-300">Sign Out</h3>
              <p className="text-xs text-slate-400">
                End your workspace session safely.
              </p>
              <button
                onClick={logout}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of SkillGap AI</span>
              </button>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
