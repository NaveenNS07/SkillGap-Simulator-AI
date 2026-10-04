import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getUserSimulations } from '../firebase/db';
import { generatePersonalizedRoadmap } from '../services/gemini';
import { 
  Milestone, 
  CheckCircle2, 
  ArrowDown, 
  Target, 
  Sparkles, 
  Zap, 
  Flag,
  ChevronRight
} from 'lucide-react';

export default function CareerRoadmapPage() {
  const { currentUser } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoadmap() {
      if (currentUser?.uid) {
        const sims = await getUserSimulations(currentUser.uid);
        const latest = sims[0];
        const careerId = latest?.careerId || 'data-scientist';
        const score = latest?.overallScore || 72;
        const gaps = latest?.skillGaps || [];

        const generated = await generatePersonalizedRoadmap(careerId, score, gaps);
        setRoadmap(generated);
      }
      setLoading(false);
    }
    loadRoadmap();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Sidebar />
          <main className="flex-1 md:pl-8 py-12 text-center text-xs text-slate-400">
            Generating personalized career roadmap with Gemini AI...
          </main>
        </div>
      </div>
    );
  }

  const stages = roadmap?.stages || [
    {
      phase: "Phase 1: Current Diagnostic",
      focus: "Baseline Readiness Evaluation (72%)",
      actionItems: ["Completed initial E-Commerce simulation", "Identified Business Reasoning skill gap"],
      targetReadiness: 72
    },
    {
      phase: "Phase 2: Foundation & Targeted Practice",
      focus: "Improve Business Reasoning & Financial ROI Metrics",
      actionItems: ["Complete Customer Churn ROI Challenge", "Study unit economics & LTV formulas"],
      targetReadiness: 78
    },
    {
      phase: "Phase 3: Advanced Scenario Simulation",
      focus: "Re-simulate Data Scientist Role under Tight Constraints",
      actionItems: ["Execute Advanced Data Scientist incident", "Achieve 80%+ Business Thinking score"],
      targetReadiness: 85
    },
    {
      phase: "Phase 4: Senior Job Readiness Target",
      focus: "Senior Data Scientist Job Offer Preparedness",
      actionItems: ["Export verified Skill Profile to portfolio", "Complete multi-role simulation battery"],
      targetReadiness: 92
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized Career Intelligence</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">{roadmap?.roadmapTitle || 'CAREER ROADMAP'}</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Dynamically generated step-by-step career trajectory based on your actual simulation evidence and skill gaps.
            </p>
          </div>

          {/* Timeline Stages */}
          <div className="space-y-6 max-w-3xl relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-500 before:to-emerald-500">
            
            {stages.map((stage, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === stages.length - 1;

              return (
                <div key={idx} className="relative pl-16">
                  
                  {/* Node Icon */}
                  <div className={`absolute left-4 top-1 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold ${
                    isFirst ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30' :
                    isLast ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' :
                    'bg-[#0b0f19] border-cyan-500 text-cyan-300'
                  }`}>
                    {isLast ? <Flag className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Stage Card */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 hover:border-indigo-500/30 transition-all">
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{stage.phase}</span>
                        <h3 className="text-base font-bold text-white mt-0.5">{stage.focus}</h3>
                      </div>

                      <div className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
                        Target Readiness: {stage.targetReadiness}%
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Required Actions:</span>
                      <div className="space-y-2">
                        {stage.actionItems?.map((action, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </main>
      </div>
    </div>
  );
}
