import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingOverlay from '../components/LoadingOverlay';
import { useAuth } from '../context/AuthContext';
import { 
  generateScenario, 
  generateAdaptiveEvent, 
  evaluateSimulation 
} from '../services/gemini';
import { saveSimulationResult } from '../firebase/db';
import { 
  BrainCircuit, 
  Clock, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Database,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

export default function SimulationWorkspacePage() {
  const { simulationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // State from location or defaults
  const careerId = location.state?.careerId || 'data-scientist';
  const careerName = location.state?.careerName || 'Data Scientist';
  const difficulty = location.state?.difficulty || 'Intermediate';

  // Simulation Stages: 1 = Initial Scenario, 2 = Adaptive Event, 3 = Evaluating
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingTitle, setLoadingTitle] = useState("AI IS BUILDING YOUR WORK SIMULATION");

  // AI Content State
  const [scenario, setScenario] = useState(null);
  const [adaptiveEvent, setAdaptiveEvent] = useState(null);

  // User Response State
  const [initialResponse, setInitialResponse] = useState('');
  const [adaptiveResponse, setAdaptiveResponse] = useState('');

  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // 1. Initial Scenario Generation on Mount
  useEffect(() => {
    let mounted = true;
    async function loadInitialScenario() {
      setLoading(true);
      setLoadingTitle("AI IS BUILDING YOUR WORK SIMULATION");
      try {
        const data = await generateScenario(careerId, difficulty);
        if (mounted) {
          setScenario(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Scenario error:", err);
        setLoading(false);
      }
    }
    loadInitialScenario();
    return () => { mounted = false; };
  }, [careerId, difficulty]);

  // Timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Submit Stage 1 Response -> Trigger Adaptive Event (Stage 2)
  const handleStage1Submit = async (e) => {
    e.preventDefault();
    if (!initialResponse.trim()) return;

    setLoading(true);
    setLoadingTitle("ANALYZING YOUR RESPONSE & GENERATING DYNAMIC EVENT");

    try {
      const eventData = await generateAdaptiveEvent(careerId, scenario, initialResponse);
      setAdaptiveEvent(eventData);
      setStage(2);
    } catch (err) {
      console.error("Adaptive event error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Submit Stage 2 Response -> Trigger AI Evaluation & Save to Firestore
  const handleStage2Submit = async (e) => {
    e.preventDefault();
    if (!adaptiveResponse.trim()) return;

    setLoading(true);
    setLoadingTitle("AI EVALUATING PERFORMANCE ACROSS 7 SKILL DIMENSIONS");

    try {
      const userResponses = {
        initialResponse,
        adaptiveResponse
      };

      const evalResult = await evaluateSimulation(careerId, scenario, adaptiveEvent, userResponses);

      const fullSimRecord = {
        simulationId: simulationId || 'sim_' + Date.now(),
        userId: currentUser?.uid || 'anonymous',
        careerId,
        careerName,
        difficulty,
        startedAt: new Date(Date.now() - secondsElapsed * 1000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed',
        scenario,
        adaptiveEvent,
        userResponses,
        ...evalResult
      };

      // Save to Firestore / LocalStorage
      await saveSimulationResult(currentUser?.uid, fullSimRecord);

      // Navigate to Results Page with state
      navigate(`/simulations/results/${fullSimRecord.simulationId}`, {
        state: { simulationData: fullSimRecord }
      });

    } catch (err) {
      console.error("Evaluation error:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay title={loadingTitle} />;
  }

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Workspace Top Header Bar */}
        <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold text-white">{careerName} Simulation Workspace</h1>
                {scenario?.isDemoFallback && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                    DEMO SCENARIO ACTIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{scenario?.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Elapsed: {formatTime(secondsElapsed)}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              Stage {stage} of 2: {stage === 1 ? 'Initial Diagnosis' : 'Adaptability Pivot'}
            </div>
          </div>
        </div>

        {/* Main Workspace Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Scenario Context, Data Telemetry, Task (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Company Context */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Company Situation & Crisis</span>
                <span className="text-[11px] font-mono text-slate-400">Difficulty: {difficulty}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {scenario?.companyContext}
              </p>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 font-medium">
                <span className="font-bold text-white">Primary Objective:</span> {scenario?.objective}
              </div>
            </div>

            {/* Available Telemetry Data Table */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Available Operational Telemetry</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scenario?.availableData?.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 block">{item.metric}</span>
                    <span className="text-sm font-bold text-cyan-300 block font-mono">{item.value}</span>
                  </div>
                ))}
              </div>

              {scenario?.constraints && scenario.constraints.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">Operational Constraints:</span>
                  <ul className="space-y-1">
                    {scenario.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Stage 2 Adaptive Event Banner (Appears when Stage 2 triggered) */}
            {stage === 2 && adaptiveEvent && (
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30 space-y-3 animate-pulse">
                <div className="flex items-center space-x-2 text-amber-400">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">{adaptiveEvent.eventTitle}</h3>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {adaptiveEvent.eventDescription}
                </p>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-200">
                  {adaptiveEvent.adaptiveQuestion}
                </div>
              </div>
            )}

          </div>

          {/* Right Panel: Interactive User Response Workspace (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stage 1 Response Form */}
            {stage === 1 && (
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Task Assignment #1</span>
                  <h3 className="text-sm font-bold text-white mt-1">{scenario?.task}</h3>
                </div>

                <form onSubmit={handleStage1Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Technical & Analytical Reasoning:
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={initialResponse}
                      onChange={(e) => setInitialResponse(e.target.value)}
                      placeholder="Explain what data patterns or fault vectors you investigate first, why you chose them, and your initial working hypothesis..."
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Suggestion prompts */}
                  {scenario?.initialPromptOptions && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Quick reasoning ideas:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {scenario.initialPromptOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setInitialResponse((prev) => (prev ? prev + "\n" + opt : opt))}
                            className="px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] text-left transition-colors"
                          >
                            + {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-400 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Submit Initial Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Stage 2 Response Form (Adaptability Pivot) */}
            {stage === 2 && (
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Adaptability & Final Recommendation</span>
                  <h3 className="text-sm font-bold text-white mt-1">Submit Revised Strategy</h3>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-indigo-300 block">Your Stage 1 Summary:</span>
                  <p className="line-clamp-2 text-[11px] italic text-slate-400">"{initialResponse}"</p>
                </div>

                <form onSubmit={handleStage2Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Revised Strategy & Executive Recommendation:
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={adaptiveResponse}
                      onChange={(e) => setAdaptiveResponse(e.target.value)}
                      placeholder="Explain how the new telemetry alters your hypothesis. Provide concrete next steps and your final executive recommendation..."
                      className="w-full p-4 rounded-xl bg-white/5 border border-amber-500/30 text-slate-100 text-xs focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/25 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>FINALIZE & RUN AI EVALUATION</span>
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
