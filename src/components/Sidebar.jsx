import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  BarChart2, 
  AlertTriangle, 
  Milestone, 
  History, 
  User, 
  Settings,
  Zap
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Career Explorer', path: '/careers', icon: Compass },
    { name: 'Skill Profile', path: '/profile/skills', icon: BarChart2 },
    { name: 'Skill Gaps', path: '/skill-gaps', icon: AlertTriangle },
    { name: 'Career Roadmap', path: '/roadmap', icon: Milestone },
    { name: 'Simulation History', path: '/history', icon: History },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 bg-[#070913]/90 hidden md:flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)] sticky top-16">
      <div className="space-y-6">
        
        {/* Workspace section header */}
        <div className="px-3 pt-2">
          <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Work Simulation Engine
          </p>
        </div>

        {/* Quick Simulation CTA button */}
        <NavLink
          to="/careers"
          className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-400 transition-all group"
        >
          <Zap className="w-4 h-4 text-cyan-200 group-hover:animate-bounce" />
          <span>New Simulation</span>
        </NavLink>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

      </div>

      {/* Footer info card */}
      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
        <p className="text-slate-300 font-semibold mb-1">AI Career Intelligence</p>
        <p className="text-[11px] text-slate-400 leading-tight">
          Readiness score is calculated from real simulation telemetry.
        </p>
      </div>
    </aside>
  );
}
