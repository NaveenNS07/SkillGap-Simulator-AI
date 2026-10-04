import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getUserSimulations } from '../firebase/db';
import { 
  Zap, 
  BarChart3, 
  Target, 
  AlertTriangle, 
  Award, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, userProfile } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (currentUser?.uid) {
        const sims = await getUserSimulations(currentUser.uid);
        setSimulations(sims || []);
      }
      setLoading(false);
    }
    loadData();
  }, [currentUser]);

  // Compute statistics from actual Firestore simulation history
  const totalCompleted = simulations.length;
  const averageReadiness = totalCompleted > 0 
    ? Math.round(simulations.reduce((acc, s) => acc + (s.overallScore || 0), 0) / totalCompleted)
    : (userProfile?.averageReadiness || 0);

  // Extract strongest skill and biggest gap dynamically from latest simulation
  const latestSim = simulations[0];
  const strongestSkill = latestSim?.strengths?.[0]?.title || "Analytical Reasoning";
  const biggestGap = latestSim?.skillGaps?.[0]?.skill || "Business Reasoning";

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          {/* Welcome Header */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0b0f19] to-cyan-950/30 border border-white/15 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Brain className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live Work Intelligence Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {userProfile?.name || currentUser?.displayName || 'Candidate'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Experience realistic workplace scenarios, solve live business crises, and track your evidence-backed job readiness score.
              </p>
            </div>

            <Link
              to="/careers"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-400 transition-all flex items-center space-x-2 shrink-0"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Start New Simulation</span>
            </Link>
          </div>

          {/* Key Metrics Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Simulations Completed</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white">{totalCompleted}</div>
              <p className="text-[11px] text-slate-400">Across target career paths</p>
            </div>

            <div className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Overall Career Readiness</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-cyan-300">{averageReadiness}%</div>
              <p className="text-[11px] text-slate-400">Weighted evidence average</p>
            </div>

            <div className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Strongest Skill</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="text-sm font-bold text-emerald-300 truncate">{strongestSkill}</div>
              <p className="text-[11px] text-slate-400">Proven in recent simulations</p>
            </div>

            <div className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Biggest Skill Gap</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-sm font-bold text-amber-300 truncate">{biggestGap}</div>
              <Link to="/skill-gaps" className="text-[11px] text-indigo-400 hover:underline inline-flex items-center">
                <span>View Challenge</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>

          </div>

          {/* Main Content Grid: Recent Simulations & Recommended Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Simulations List (2 cols) */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Simulations</h3>
                  <p className="text-xs text-slate-400">Real performance logs saved to Cloud Firestore</p>
                </div>
                <Link to="/history" className="text-xs text-indigo-400 font-semibold hover:underline flex items-center">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              {loading ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading simulations...</div>
              ) : simulations.length === 0 ? (
                <div className="p-8 rounded-xl bg-white/5 border border-dashed border-white/10 text-center space-y-4">
                  <Clock className="w-8 h-8 text-slate-500 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">No Simulations Completed Yet</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      Choose a career path and step into your first realistic workplace simulation to measure your job readiness.
                    </p>
                  </div>
                  <Link
                    to="/careers"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md"
                  >
                    <span>Start Your First Simulation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {simulations.slice(0, 5).map((sim) => (
                    <Link
                      key={sim.simulationId}
                      to={`/simulations/results/${sim.simulationId}`}
                      className="glass-card p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all group border border-white/5"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                          {sim.overallScore || 72}%
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {sim.careerName || 'Data Scientist'}
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            {sim.scenario?.title || 'E-Commerce Incident'} • {sim.difficulty || 'Intermediate'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-right">
                        <div>
                          <span className="block text-xs font-bold text-slate-200">
                            Readiness: {sim.overallScore || 72}%
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            {new Date(sim.completedAt || sim.startedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions & Next Steps (1 col) */}
            <div className="space-y-6">
              
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  <span>Next Recommended Step</span>
                </h3>
                
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <span className="text-[10px] font-mono text-indigo-300 uppercase">Targeted Challenge</span>
                  <h4 className="text-xs font-bold text-white">E-Commerce Churn ROI Analysis</h4>
                  <p className="text-[11px] text-slate-300">
                    Target your biggest skill gap: <span className="font-semibold text-amber-300">Business Reasoning</span>.
                  </p>
                  <Link
                    to="/skill-gaps"
                    className="inline-block pt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Start Challenge (5-7 days) →
                  </Link>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    to="/roadmap"
                    className="w-full py-2.5 px-4 rounded-xl glass-card text-xs font-semibold text-slate-200 flex items-center justify-between hover:bg-white/10"
                  >
                    <span>View AI Career Roadmap</span>
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                  </Link>
                  <Link
                    to="/profile/skills"
                    className="w-full py-2.5 px-4 rounded-xl glass-card text-xs font-semibold text-slate-200 flex items-center justify-between hover:bg-white/10"
                  >
                    <span>Inspect 7-Skill Radar</span>
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
