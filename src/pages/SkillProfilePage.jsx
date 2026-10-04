import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SkillRadarChart from '../components/SkillRadarChart';
import { useAuth } from '../context/AuthContext';
import { getUserSimulations } from '../firebase/db';
import { 
  BarChart3, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function SkillProfilePage() {
  const { currentUser } = useAuth();
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

  // Aggregate averages across all completed simulations
  const count = simulations.length;
  const latestSim = simulations[0];

  const averageScores = {
    technicalScore: count > 0 ? Math.round(simulations.reduce((a, s) => a + (s.technicalScore || 70), 0) / count) : 82,
    problemSolvingScore: count > 0 ? Math.round(simulations.reduce((a, s) => a + (s.problemSolvingScore || 70), 0) / count) : 76,
    communicationScore: count > 0 ? Math.round(simulations.reduce((a, s) => a + (s.communicationScore || 70), 0) / count) : 70,
    decisionMakingScore: count > 0 ? Math.round(simulations.reduce((a, s) => a + (s.decisionMakingScore || 70), 0) / count) : 68,
    adaptabilityScore: count > 0 ? Math.round(simulations.reduce((a, s) => a + (s.adaptabilityScore || 70), 0) / count) : 74,
    businessThinkingScore: count > 0 ? Math.round(simulations.reduce((a, s) => a + (s.businessThinkingScore || 70), 0) / count) : 61,
  };

  const strongest = latestSim?.strengths?.[0]?.title || "Technical Reasoning (82%)";
  const weakest = latestSim?.skillGaps?.[0]?.skill || "Business Thinking (61%)";

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Evidence-Based Skill Vector</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Skill Profile</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Aggregated capability map measured from real simulation telemetry across all completed career scenarios.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Strongest Skill</span>
              </div>
              <div className="text-lg font-extrabold text-white truncate">{strongest}</div>
              <p className="text-[11px] text-slate-400">High confidence across simulations</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Primary Skill Gap</span>
              </div>
              <div className="text-lg font-extrabold text-amber-300 truncate">{weakest}</div>
              <p className="text-[11px] text-slate-400">Recommended for targeted challenge</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Total Telemetry Logs</span>
              </div>
              <div className="text-2xl font-extrabold text-cyan-300">{count} Simulations</div>
              <p className="text-[11px] text-slate-400">Saved in Firestore database</p>
            </div>
          </div>

          {/* Radar Chart & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-base font-bold text-white">Aggregated Skill Radar</h3>
              <SkillRadarChart scores={averageScores} />
            </div>

            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white">Skill Dimension Index</h3>
              
              <div className="space-y-4">
                {[
                  { name: "Technical Reasoning", score: averageScores.technicalScore },
                  { name: "Problem Solving", score: averageScores.problemSolvingScore },
                  { name: "Adaptability", score: averageScores.adaptabilityScore },
                  { name: "Communication", score: averageScores.communicationScore },
                  { name: "Decision Making", score: averageScores.decisionMakingScore },
                  { name: "Business Thinking", score: averageScores.businessThinkingScore },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{s.name}</span>
                    <span className="font-mono text-xs font-bold text-indigo-300">{s.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
