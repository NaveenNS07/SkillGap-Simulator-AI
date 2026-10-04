import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Github, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070e] text-slate-400 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                SkillGap<span className="text-indigo-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Don't choose a career by watching it. Experience realistic workplace scenarios and measure your actual job readiness.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Supported Careers</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/careers" className="hover:text-indigo-400 transition-colors">Data Scientist</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-400 transition-colors">Software Engineer</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-400 transition-colors">Product Manager</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Job Readiness Engine</Link></li>
              <li><Link to="/skill-gaps" className="hover:text-indigo-400 transition-colors">Evidence Skill Gaps</Link></li>
              <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">AI Personalized Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Technology & Security</h4>
            <p className="text-xs text-slate-400 mb-3">
              Powered by Google Gemini 2.5 API & Cloud Firestore isolation.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>User Data Isolated</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillGap Simulator AI. Built for Future of Work Hackathon.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>React + Firebase + Google Gemini API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
