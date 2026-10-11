import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const DemoBanner: React.FC = () => {
  const { role, switchRole, currentUser, isDemoMode } = useAuth();
  const { resetDemoData } = useData();
  const [collapsed, setCollapsed] = useState(false);

  if (!isDemoMode && role === 'student') return null;

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-20 md:bottom-5 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17365D] text-white shadow-lg text-xs hover:bg-[#2F6FED] transition-all"
        title="Expand Demo Environment Bar"
      >
        <span className="w-2 h-2 rounded-full bg-[#138A72] animate-pulse"></span>
        <span className="font-semibold">Demo Sandbox: {role === 'admin' ? 'Admin' : 'Student'}</span>
      </button>
    );
  }

  return (
    <aside aria-label="Demo Environment Bar" className="bg-[#17365D] text-white text-xs px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shadow-sm relative z-40 border-b border-[#2F6FED]/30">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#138A72] text-white font-semibold text-[10px] tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          Demo Sandbox
        </span>
        <span className="text-gray-200">
          Logged in as <strong className="text-white font-semibold">{currentUser.name}</strong> ({role === 'admin' ? 'Facilities Operations Dispatcher' : 'Student Persona'})
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center bg-[#0F233D] rounded-lg p-0.5 border border-[#2F6FED]/40">
          <button
            onClick={() => switchRole('student')}
            className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-all ${
              role === 'student' ? 'bg-[#2F6FED] text-white shadow-sm' : 'text-gray-300 hover:text-white'
            }`}
          >
            Student Mode
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-all ${
              role === 'admin' ? 'bg-[#138A72] text-white shadow-sm' : 'text-gray-300 hover:text-white'
            }`}
          >
            Facilities Admin
          </button>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all tasks, syllabus topics, and water reports back to initial seed data?')) {
              resetDemoData();
            }
          }}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-[11px] font-medium transition-colors"
          title="Reset tasks and reports to default demo state"
        >
          Reset Demo Data
        </button>

        <button
          onClick={() => setCollapsed(true)}
          className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          title="Minimize bar"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </aside>
  );
};
