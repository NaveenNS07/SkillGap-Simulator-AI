import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoadingOverlay({ 
  title = "AI IS BUILDING YOUR WORK SIMULATION", 
  steps = [
    "Analyzing career requirements...",
    "Creating realistic workplace context...",
    "Injecting telemetry & metrics data...",
    "Preparing adaptive challenge..."
  ] 
}) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070913]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel bg-[#0b0f19] border border-indigo-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center">
        
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Animated Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 animate-spin opacity-75 blur-md"></div>
          <div className="relative w-full h-full bg-[#0b0f19] rounded-2xl border border-indigo-400/30 flex items-center justify-center">
            <BrainCircuit className="w-10 h-10 text-indigo-400 animate-pulse" />
          </div>
        </div>

        <h3 className="text-sm font-extrabold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-cyan-300 mb-6">
          {title}
        </h3>

        {/* Step Progress Checklist */}
        <div className="space-y-3 text-left bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
          {steps.map((stepText, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={idx} className="flex items-center space-x-3 text-xs transition-all">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0"></div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0"></div>
                )}
                <span className={isDone ? 'text-slate-300 font-medium' : isCurrent ? 'text-indigo-300 font-semibold animate-pulse' : 'text-slate-500'}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Gemini 2.5 AI Engine Active</span>
        </div>

      </div>
    </div>
  );
}
