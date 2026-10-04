import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getUserSimulations } from '../firebase/db';
import { 
  AlertTriangle, 
  Target, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';

export default function SkillGapPage() {
  const { currentUser } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);

  useEffect(() => {
    async function loadSims() {
      if (currentUser?.uid) {
        const sims = await getUserSimulations(currentUser.uid);
        setSimulations(sims || []);
      }
    }
    loadSims();
  }, [currentUser]);

  // Extract skill gaps from Firestore simulation logs or fallback defaults
  const latestSim = simulations[0];
  const skillGaps = latestSim?.skillGaps || [
    {
      skill: "Business Reasoning",
      currentLevel: 61,
      targetLevel: 80,
      evidence: "Identified mobile cancellation pattern but failed to calculate monetary revenue ROI loss for management.",
      challenge: "Analyze customer churn dataset and present a 3-point executive business ROI recommendation.",
      estimatedEffort: "5-7 days"
    },
    {
      skill: "Executive Communication",
      currentLevel: 70,
      targetLevel: 85,
      evidence: "Initial response contained detailed technical analysis but lacked a clear 3-bullet action plan for non-technical stakeholders.",
      challenge: "Synthesize microservice latency outage into a 1-page C-suite incident report.",
      estimatedEffort: "3-4 days"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Evidence-Backed Diagnostics</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">YOUR SKILL GAPS</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Targeted skill gaps identified by Gemini AI during your workplace simulations, backed by concrete evidence.
            </p>
          </div>

          {/* Skill Gaps List */}
          <div className="space-y-6">
            {skillGaps.map((gap, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-[#0b0f19] to-indigo-950/20 space-y-6 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Skill Gap #{idx + 1}</span>
                    <h2 className="text-2xl font-extrabold text-white mt-1">{gap.skill}</h2>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Current</span>
                      <span className="text-lg font-bold text-amber-300 font-mono">{gap.currentLevel}%</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Target</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">{gap.targetLevel}%</span>
                    </div>
                  </div>
                </div>

                {/* Evidence explanation */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Evidence from Recent Simulation:</span>
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono italic">
                    "{gap.evidence}"
                  </p>
                </div>

                {/* Recommended Challenge */}
                <div className="p-5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Recommended Improvement Challenge</span>
                    <h4 className="text-sm font-bold text-white">{gap.challenge}</h4>
                    <span className="text-xs text-slate-400 flex items-center pt-1">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" /> Estimated effort: {gap.estimatedEffort}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveChallenge(gap)}
                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-400 transition-all flex items-center justify-center space-x-2 shrink-0"
                  >
                    <Zap className="w-4 h-4 text-cyan-200" />
                    <span>START CHALLENGE</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Active Challenge Modal */}
          {activeChallenge && (
            <div className="fixed inset-0 z-50 bg-[#070913]/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="max-w-lg w-full glass-panel bg-[#0b0f19] border border-indigo-500/40 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase">Targeted Challenge Active</span>
                    <h3 className="text-lg font-bold text-white mt-1">{activeChallenge.skill} Mastery</h3>
                  </div>
                  <button onClick={() => setActiveChallenge(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeChallenge.challenge}
                </p>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2">
                  <span className="font-bold block">Challenge Steps:</span>
                  <ul className="space-y-1 text-[11px] list-disc list-inside">
                    <li>Analyze customer churn metric spreadsheet</li>
                    <li>Formulate 3 concrete business recommendations for executive leadership</li>
                    <li>Re-run {latestSim?.careerName || 'Data Scientist'} simulation to verify score lift above {activeChallenge.targetLevel}%</li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveChallenge(null)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Accept & Mark In Progress
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
