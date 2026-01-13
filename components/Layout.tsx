
import React from 'react';
import { AppStep } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: AppStep;
  onStepChange: (step: AppStep) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentStep, onStepChange }) => {
  const steps = [
    { id: AppStep.INITIAL, label: 'Onboarding' },
    { id: AppStep.DOCUMENTS, label: 'Documents' },
    { id: AppStep.CHAT, label: 'Prep Session' },
    { id: AppStep.REPORT, label: 'Final Plan' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onStepChange(AppStep.INITIAL)}>
            <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center font-bold text-slate-900">P</div>
            <h1 className="text-xl font-bold tracking-tight serif">ProbatePro</h1>
          </div>
          
          <nav className="flex items-center gap-1">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => onStepChange(step.id)}
                  disabled={currentStep === step.id}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    currentStep === step.id 
                      ? 'bg-emerald-500 text-slate-900' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {step.label}
                </button>
                {idx < steps.length - 1 && <div className="w-4 h-px bg-slate-700"></div>}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 p-4 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} ProbatePro - Designed for Pro Se Justice.</p>
        <p className="mt-1">Notice: Not a law firm. No legal advice provided.</p>
      </footer>
    </div>
  );
};

export default Layout;
