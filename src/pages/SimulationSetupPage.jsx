import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCareerById } from '../data/careers';
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  ArrowLeft, 
  CheckCircle2, 
  Sliders
} from 'lucide-react';

export default function SimulationSetupPage() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const career = getCareerById(careerId);

  const [difficulty, setDifficulty] = useState('Intermediate');
  const [selectedType, setSelectedType] = useState(career.simulationTypes[0]);

  const handleStartSimulation = () => {
    // Generate unique simulation ID
    const simulationId = 'sim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    navigate(`/simulations/workspace/${simulationId}`, {
      state: {
        simulationId,
        careerId: career.careerId,
        careerName: career.name,
        difficulty,
        simulationType: selectedType
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <Link to="/careers" className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Career Explorer
          </Link>

          {/* Setup Container */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Simulation Setup</span>
                <h1 className="text-3xl font-extrabold text-white mt-1">{career.name} Simulation</h1>
                <p className="text-xs text-slate-400 mt-1">Configure difficulty and select incident type before launching</p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Est. Duration: {career.estimatedDuration}</span>
              </div>
            </div>

            {/* 1. Simulation Scenario Focus */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Select Simulation Scenario:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {career.simulationTypes.map((simType, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedType(simType)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedType === simType
                        ? 'bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/50'
                        : 'glass-card border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs font-bold mb-1">Scenario #{idx + 1}</span>
                    <span className="block text-xs text-slate-300 font-medium">{simType}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Difficulty */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Select Adaptive Difficulty Level:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      difficulty === level
                        ? 'bg-cyan-600/20 border-cyan-500 text-white ring-2 ring-cyan-500/50'
                        : 'glass-card border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{level}</span>
                      {level === 'Intermediate' && (
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">Recommended</span>
                      )}
                    </div>
                    <span className="block text-[11px] text-slate-400">
                      {level === 'Beginner' ? 'Standard constraints with guidance hints.' :
                       level === 'Intermediate' ? 'Realistic workplace pressure with dynamic events.' :
                       'Incomplete telemetry, conflicting stakeholder constraints.'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Skills Evaluated Checklist */}
            <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/10">
              <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Professional Skills Evaluated in This Session:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {career.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* START SIMULATION BUTTON */}
            <div className="pt-4 text-center">
              <button
                onClick={handleStartSimulation}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 mx-auto"
              >
                <Zap className="w-5 h-5 text-cyan-200" />
                <span>START SIMULATION</span>
              </button>
              <p className="text-[11px] text-slate-500 mt-2">
                Gemini AI engine will generate a live workplace scenario based on your parameters.
              </p>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
