import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, 
  BrainCircuit, 
  User, 
  LogOut, 
  Settings, 
  History, 
  Compass, 
  BarChart3, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, userProfile, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isPublic = !currentUser;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#070913]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to={currentUser ? "/dashboard" : "/"} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight">
                SkillGap<span className="text-indigo-400 font-extrabold">.AI</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Career Simulator</span>
            </div>
          </Link>

          {/* Navigation Links for Authenticated User */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/dashboard' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/careers" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname.startsWith('/careers') ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Careers
              </Link>
              <Link 
                to="/profile/skills" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/profile/skills' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Skill Profile
              </Link>
              <Link 
                to="/skill-gaps" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/skill-gaps' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Skill Gaps
              </Link>
              <Link 
                to="/roadmap" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/roadmap' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Roadmap
              </Link>
              <Link 
                to="/history" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/history' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                History
              </Link>
            </div>
          )}

          {/* Right Action Menu */}
          <div className="flex items-center space-x-3">
            {isPublic ? (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:from-indigo-500 hover:to-cyan-400 shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-2"
                >
                  <span>Experience Career</span>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/careers" 
                  className="hidden sm:flex items-center space-x-2 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Start Simulation</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all focus:outline-none"
                  >
                    <img 
                      src={userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.email}`} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-lg object-cover bg-indigo-900/40"
                    />
                    <span className="hidden sm:block text-xs font-medium text-slate-200 max-w-[100px] truncate">
                      {userProfile?.name || currentUser?.displayName || currentUser?.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {dropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 glass-panel bg-[#0b0f19]/95 border border-white/15 rounded-xl shadow-2xl py-2 z-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-xs font-semibold text-slate-200 truncate">{userProfile?.name || 'User Profile'}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                      </div>

                      <div className="py-1">
                        <Link to="/profile" className="flex items-center px-4 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white">
                          <User className="w-4 h-4 mr-2 text-indigo-400" />
                          My Profile
                        </Link>
                        <Link to="/profile/skills" className="flex items-center px-4 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white">
                          <BarChart3 className="w-4 h-4 mr-2 text-cyan-400" />
                          Skill Profile
                        </Link>
                        <Link to="/settings" className="flex items-center px-4 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white">
                          <Settings className="w-4 h-4 mr-2 text-slate-400" />
                          Settings & Gemini Key
                        </Link>
                      </div>

                      <div className="border-t border-white/10 pt-1">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-left"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
