import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getUserSimulations } from '../firebase/db';
import { 
  History, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  Award, 
  Zap, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function HistoryPage() {
  const { currentUser } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (currentUser?.uid) {
        const sims = await getUserSimulations(currentUser.uid);
        setSimulations(sims || []);
      }
      setLoading(false);
    }
    loadHistory();
  }, [currentUser]);

  // Compute progress delta if multiple simulations exist
  const firstScore = simulations.length > 1 ? simulations[simulations.length - 1].overallScore || 68 : null;
  const latestScore = simulations.length > 0 ? simulations[0].overallScore || 76 : null;
  const improvement = firstScore !== null && latestScore !== null ? latestScore - firstScore : null;

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <History className="w-3.5 h-3.5" />
              <span>Persistent Firestore Logs</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">SIMULATION HISTORY</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Chronological log of all completed workplace career simulations and performance telemetry.
            </p>
          </div>

          {/* Progress Tracking Banner (if multiple attempts exist) */}
          {improvement !== null && (
            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Progress Tracking Lift</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    Previous: {firstScore}% → Current: {latestScore}%
                  </h3>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-extrabold flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4" />
                <span>Improvement: +{improvement}%</span>
              </div>
            </div>
          )}

          {/* History Log List */}
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Completed Sessions ({simulations.length})</span>
              <Link to="/careers" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center">
                <span>Start New Simulation</span>
                <Zap className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading history logs...</div>
            ) : simulations.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400 space-y-3">
                <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                <p>No completed simulations found in your Firestore record.</p>
                <Link to="/careers" className="inline-block pt-2 text-indigo-400 font-bold hover:underline">
                  Launch Your First Simulation →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {simulations.map((sim) => (
                  <div 
                    key={sim.simulationId} 
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-sm">
                        {sim.overallScore || 72}%
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{sim.careerName || 'Data Scientist'}</h4>
                        <p className="text-xs text-slate-400">{sim.scenario?.title || 'E-Commerce Incident'}</p>
                        <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{new Date(sim.completedAt || sim.startedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Difficulty: {sim.difficulty || 'Intermediate'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                        {sim.status || 'Completed'}
                      </span>

                      <Link
                        to={`/simulations/results/${sim.simulationId}`}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-indigo-600 hover:text-white border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center space-x-1"
                      >
                        <span>View Result</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
