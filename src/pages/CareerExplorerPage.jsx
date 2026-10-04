import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { CAREERS } from '../data/careers';
import { 
  Search, 
  Clock, 
  BarChart3, 
  Code2, 
  Layers, 
  ArrowRight, 
  Zap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function CareerExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const iconMap = {
    BarChart3: BarChart3,
    Code2: Code2,
    Layers: Layers
  };

  const filteredCareers = CAREERS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Realistic Workplace Simulations</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Career Explorer</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Don’t choose a career path blindly. Step into realistic scenarios and measure your actual performance before committing.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-white/10">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search careers or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="font-semibold text-slate-300">Filter Tier:</span>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                      : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Career Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => {
              const IconComponent = iconMap[career.icon] || BarChart3;

              return (
                <div 
                  key={career.careerId} 
                  className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-indigo-500/40 transition-all space-y-6 group"
                >
                  <div className="space-y-4">
                    
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${career.color} p-[1px]`}>
                        <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                        {career.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {career.name}
                      </h3>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />{career.estimatedDuration}</span>
                        <span>•</span>
                        <span>{career.difficultyLevels.join(', ')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {career.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Skills Evaluated:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  <Link
                    to={`/simulations/setup/${career.careerId}`}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-cyan-500"
                  >
                    <Zap className="w-4 h-4 text-cyan-200" />
                    <span>Start Simulation</span>
                  </Link>

                </div>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}
