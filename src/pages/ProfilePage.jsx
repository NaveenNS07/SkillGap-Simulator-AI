import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { saveUserProfile } from '../firebase/db';
import { CAREERS } from '../data/careers';
import { 
  User, 
  Mail, 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  Save, 
  Sparkles,
  Camera,
  AlertCircle
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, userProfile, refreshProfile } = useAuth();

  const [name, setName] = useState(userProfile?.name || currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL || '');
  const [currentCareer, setCurrentCareer] = useState(userProfile?.currentCareer || 'data-scientist');
  const [loading, setLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSavedMessage('');
    try {
      await saveUserProfile({
        uid: currentUser.uid,
        name,
        email: currentUser.email,
        photoURL: photoURL || userProfile?.photoURL,
        currentCareer,
        totalSimulations: userProfile?.totalSimulations || 0,
        averageReadiness: userProfile?.averageReadiness || 0
      });
      await refreshProfile();
      setSavedMessage('Profile successfully updated in Cloud Firestore!');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white">USER PROFILE</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Manage your personal details, target career focus, and workspace preferences.
            </p>
          </div>

          {savedMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{savedMessage}</span>
            </div>
          )}

          {/* Profile Card & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Card Info (5 cols) */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 space-y-6 text-center">
              <div className="relative w-24 h-24 mx-auto">
                <img 
                  src={photoURL || userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.email}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-2xl object-cover bg-indigo-950 border-2 border-indigo-500/40 shadow-xl"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{name || 'User Candidate'}</h3>
                <p className="text-xs text-slate-400">{currentUser?.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase">Simulations</span>
                  <span className="text-lg font-bold text-white">{userProfile?.totalSimulations || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase">Avg Readiness</span>
                  <span className="text-lg font-bold text-cyan-300">{userProfile?.averageReadiness || 0}%</span>
                </div>
              </div>
            </div>

            {/* Right Form (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <User className="w-5 h-5 text-indigo-400" />
                <span>Edit Profile Details</span>
              </h3>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Career Path</label>
                  <select
                    value={currentCareer}
                    onChange={(e) => setCurrentCareer(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0f19] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {CAREERS.map((c) => (
                      <option key={c.careerId} value={c.careerId}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Avatar Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Saving..." : "Save Profile Changes"}</span>
                </button>
              </form>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
