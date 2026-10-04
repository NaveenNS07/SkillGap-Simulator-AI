import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SkillRadarChart from '../components/SkillRadarChart';
import { useAuth } from '../context/AuthContext';
import { getSimulationById } from '../firebase/db';
import { 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Milestone, 
  ShieldCheck, 
  Brain,
  Share2
} from 'lucide-react';

export default function SimulationResultsPage() {
  const { simulationId } = useParams();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [simData, setSimData] = useState(location.state?.simulationData || null);
  const [loading, setLoading] = useState(!location.state?.simulationData);

  useEffect(() => {
    async function loadResult() {
      if (!simData && simulationId && currentUser?.uid) {
        const data = await getSimulationById(currentUser.uid, simulationId);
        setSimData(data);
      }
      setLoading(false);
    }
    loadResult();
  }, [simulationId, currentUser, simData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070913] flex items-center justify-center text-slate-400 text-xs">
        Fetching simulation results from Firestore...
      </div>
    );
  }

  // Fallback default structure if direct access without state
  const data = simData || {
    careerName: 'Data Scientist',
    overallScore: 72,
    technicalScore: 82,
    problemSolvingScore: 76,
    communicationScore: 70,
    decisionMakingScore: 68,
    adaptabilityScore: 74,
    businessThinkingScore: 61,
    strengths: [
      { title: "Strong Analytical Reasoning", description: "You evaluated multiple potential variables before jumping to conclusions." },
      { title: "High Adaptability", description: "You swiftly revised your hypothesis upon receiving the dynamic mobile telemetry anomaly." }
    ],
    weaknesses: [
      { title: "Business Context & ROI", description: "Identified mobile cancellation spike but failed to quantify revenue loss or customer LTV impact." }
    ],
    skillGaps: [
      {
        skill: "Business Reasoning",
        currentLevel: 61,
        targetLevel: 85,
        evidence: "Focus was primarily on technical bug fix without addressing financial revenue retention.",
        challenge: "Analyze customer churn dataset and present 3-point business recommendation",
        estimatedEffort: "5-7 days"
      }
    ],
    aiFeedback: "Demonstrated solid technical diagnostic reasoning. Connect technical anomalies directly to business revenue impact to reach Senior Job Readiness."
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Sidebar />

        <main className="flex-1 md:pl-8 space-y-8">
          
          {/* Header */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-950/40 via-[#0b0f19] to-cyan-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
                <Brain className="w-3.5 h-3.5 text-indigo-400" />
                <span>Simulation Evaluation Completed</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">YOUR SIMULATION RESULT</h1>
              <p className="text-xs text-slate-400 mt-1">
                Career Role: <span className="text-white font-semibold">{data.careerName}</span> • Difficulty: {data.difficulty || 'Intermediate'}
              </p>
            </div>

            {/* Score Badge */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-indigo-600/20 border border-indigo-500/40 shadow-xl shrink-0">
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Job Readiness Score</span>
                <span className="text-4xl font-extrabold text-indigo-300">{data.overallScore}%</span>
              </div>
            </div>
          </div>

          {/* Main Visual Evaluation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: 7-Skill Radar Chart & Breakdown (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span>7-Dimension Performance Breakdown</span>
              </h3>

              {/* Recharts Radar */}
              <SkillRadarChart scores={data} />

              {/* Quantitative Skill Bars */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {[
                  { label: "Technical Reasoning", score: data.technicalScore },
                  { label: "Problem Solving", score: data.problemSolvingScore },
                  { label: "Communication", score: data.communicationScore },
                  { label: "Decision Making", score: data.decisionMakingScore },
                  { label: "Adaptability", score: data.adaptabilityScore },
                  { label: "Business Thinking", score: data.businessThinkingScore },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{item.label}</span>
                      <span className={item.score >= 75 ? 'text-indigo-400' : 'text-amber-400'}>{item.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${item.score >= 75 ? 'bg-gradient-to-r from-indigo-500 to-cyan-400' : 'bg-gradient-to-r from-amber-500 to-rose-400'}`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Evidence-Based Strengths, Weaknesses, Skill Gaps (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* AI Executive Summary */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 bg-indigo-950/20">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">AI Executive Feedback</span>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{data.aiFeedback}"
                </p>
              </div>

              {/* Proven Strengths */}
              <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 space-y-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Demonstrated Strengths</span>
                </h3>
                <div className="space-y-3">
                  {data.strengths?.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                      <span className="font-bold text-emerald-300 block mb-1">{st.title}</span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identified Skill Gaps & Evidence */}
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Primary Skill Gap Detected</span>
                </h3>
                <div className="space-y-3">
                  {data.skillGaps?.map((gap, i) => (
                    <div key={i} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-300">{gap.skill}</span>
                        <span className="font-mono text-amber-400 font-bold">{gap.currentLevel}% → Target {gap.targetLevel}%</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                        <span className="font-bold text-slate-400">Evidence:</span> "{gap.evidence}"
                      </p>
                      <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Challenge Effort: {gap.estimatedEffort}</span>
                        <Link to="/skill-gaps" className="text-xs font-bold text-indigo-400 hover:underline">
                          Start Challenge →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  to="/roadmap"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-400 transition-all flex items-center justify-center space-x-2"
                >
                  <Milestone className="w-4 h-4" />
                  <span>View Personalized AI Roadmap</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full py-3 rounded-xl glass-card text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  Back to Dashboard
                </Link>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
