import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { CAREERS } from '../data/careers';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Target, 
  ShieldCheck, 
  BarChart2, 
  Cpu, 
  Compass, 
  Zap, 
  AlertCircle,
  Code2,
  BarChart3,
  Layers
} from 'lucide-react';

export default function LandingPage() {
  const iconMap = {
    BarChart3: BarChart3,
    Code2: Code2,
    Layers: Layers
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-400/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AI-Powered Career Readiness Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
            SkillGap Simulator <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-indigo-200 mb-6 max-w-2xl mx-auto">
            “Don’t choose a career by watching it. Experience it.”
          </p>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Experience realistic workplace scenarios, demonstrate your actual skills under dynamic constraints, discover your evidence-backed skill gaps, and prove your readiness before committing to a career path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-400 transition-all flex items-center justify-center space-x-3 group"
            >
              <span>Experience a Career</span>
              <ArrowRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-slate-200 font-semibold text-base hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              How It Works
            </a>
          </div>

          {/* Hero Simulation Mock Preview */}
          <div className="mt-16 max-w-5xl mx-auto glass-panel bg-[#0b0f19]/80 border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-2 text-xs font-mono text-slate-400">Live Simulation: Data Scientist (E-Commerce Incident)</span>
              </div>
              <span className="px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30">
                Difficulty: Intermediate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Context & Crisis</span>
                  <h4 className="text-sm font-bold text-white mt-1">ShopTrend E-Commerce Revenue Drop (-18%)</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Monthly sales dropped 18%. Analyze metrics, formulate initial diagnostic hypotheses, and adapt when dynamic iOS cancellation telemetry arrives.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                  <span className="font-bold">Dynamic Adaptive Event:</span> Mobile cancellation rate spiked to 42% on iOS 17 update. Candidate must pivot strategy.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300">AI Readiness Score</span>
                  <div className="text-4xl font-extrabold text-indigo-300 mt-1">72%</div>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <div className="flex justify-between text-slate-300"><span>Technical Reasoning</span><span className="text-indigo-400 font-bold">82%</span></div>
                    <div className="flex justify-between text-slate-300"><span>Adaptability</span><span className="text-emerald-400 font-bold">74%</span></div>
                    <div className="flex justify-between text-slate-300"><span>Business Thinking</span><span className="text-amber-400 font-bold">61%</span></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-semibold">
                  Detected Skill Gap: Business ROI Reasoning
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1 — THE PROBLEM */}
      <section className="py-20 bg-[#05070e] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">The Career Reality Gap</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Why Conventional Career Selection Fails</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            <div className="p-6 rounded-2xl glass-card text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto text-lg font-bold">1</div>
              <h4 className="text-base font-bold text-white">Career Choice</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Based on job titles, social media hype, salary expectations, and generic career quizzes.</p>
            </div>

            <div className="p-6 rounded-2xl glass-card text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto text-lg font-bold">2</div>
              <h4 className="text-base font-bold text-white">Learning</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Passive video courses and certificates that don't replicate high-stakes office pressures.</p>
            </div>

            <div className="p-6 rounded-2xl glass-card text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto text-lg font-bold">3</div>
              <h4 className="text-base font-bold text-white">Interview</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Memorized answers to predictable questions that obscure real performance skills.</p>
            </div>

            <div className="p-6 rounded-2xl glass-card text-center space-y-3 border-rose-500/30 bg-rose-500/5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-lg font-bold">4</div>
              <h4 className="text-base font-bold text-rose-300">Reality Check</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Real work begins. Unforeseen skill gaps, stress, and career mismatch occur.</p>
            </div>

          </div>

          <div className="mt-12 p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center max-w-3xl mx-auto">
            <AlertCircle className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <p className="text-base font-semibold text-indigo-200">
              “People often discover their skill gaps too late — after spending years and thousands of dollars on a career path they aren't prepared for.”
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Simulate Before You Commit</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Four Steps to Career Proof</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">01</div>
              <h4 className="text-lg font-bold text-white">Choose</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Select your target career path (Data Scientist, Software Engineer, Product Manager).</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">02</div>
              <h4 className="text-lg font-bold text-white">Experience</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Enter an AI-generated workplace scenario with real metrics, code, and constraints.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm">03</div>
              <h4 className="text-lg font-bold text-white">Perform</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Solve complex tasks and adapt when Gemini AI introduces unexpected curveballs.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">04</div>
              <h4 className="text-lg font-bold text-white">Discover</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Receive an evidence-backed Job Readiness score, skill gap breakdown, and roadmap.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — SUPPORTED CAREERS */}
      <section className="py-24 bg-[#05070e] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Role Catalog</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Supported Career Simulations</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAREERS.map((career) => {
              const IconComponent = iconMap[career.icon] || BarChart3;
              return (
                <div key={career.careerId} className="glass-card p-8 rounded-2xl flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${career.color} p-[1px]`}>
                        <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-indigo-300">
                        {career.badge}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2">{career.name}</h4>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">{career.description}</p>

                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Evaluated Dimensions:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.slice(0, 4).map((sk, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-[11px] border border-indigo-500/20">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-indigo-600 hover:text-white border border-white/10 text-slate-200 font-semibold text-xs transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Simulate {career.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY SKILLGAP SIMULATOR */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Platform Edge</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Why SkillGap Simulator AI?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <Target className="w-8 h-8 text-indigo-400" />
              <h4 className="text-base font-bold text-white">Realistic Work Scenarios</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No multiple-choice trivia. Solve authentic business crises, debug production code, and design product strategies.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <Zap className="w-8 h-8 text-cyan-400" />
              <h4 className="text-base font-bold text-white">Adaptive Difficulty Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini AI dynamically adjusts complexity, introducing live breaking updates to evaluate adaptability under pressure.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="text-base font-bold text-white">Evidence-Based Evaluation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every score is backed by exact text evidence from your response across 7 core professional dimensions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-b from-[#070913] to-[#0b0e1e] relative text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Prove Your Career Readiness?
          </h2>
          <p className="text-slate-300 text-base mb-8">
            Experience your first realistic workplace scenario in under 2 minutes.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all"
          >
            <span>Experience Your First Simulation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
