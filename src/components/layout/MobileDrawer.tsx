import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { currentUser, role, switchRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-xs bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-250">
        <div className="p-space-md flex flex-col gap-space-md">
          {/* Top Brand Bar & Close Button */}
          <div className="flex items-center justify-between pb-space-sm border-b border-border-neutral">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-secondary hover:bg-surface-container-low transition-colors"
              aria-label="Close navigation drawer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Student/Staff Profile Card */}
          <div className="bg-surface-container-low rounded-xl p-3 border border-border-neutral flex items-center gap-3">
            <img
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white bg-surface-dim shrink-0"
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-headline-sm text-sm text-on-surface font-semibold truncate">
                {currentUser.name}
              </span>
              <span className="font-body-sm text-xs text-outline truncate">
                {role === 'admin' ? 'Facilities Dispatcher' : currentUser.year || "BioEng '26"}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-1.5 py-0.2 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                  {role === 'admin' ? 'Operations' : 'Canvas Linked'}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-medium">
                  Eco Tier A+
                </span>
              </div>
            </div>
          </div>

          {/* Persona Quick Toggle */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container text-xs">
            <span className="text-secondary font-medium">Active Mode:</span>
            <button
              onClick={() => {
                switchRole(role === 'student' ? 'admin' : 'student');
                onClose();
              }}
              className="px-2.5 py-1 rounded bg-white text-primary font-semibold shadow-xs hover:bg-surface-container-lowest"
            >
              Switch to {role === 'student' ? 'Admin' : 'Student'}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search sections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-xs border border-border-neutral focus:outline-none focus:border-primary"
            />
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-3">
            {/* Core Section */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-outline px-2 block mb-1">
                Core Academic Tools
              </span>
              <div className="space-y-0.5">
                <button
                  onClick={() => handleNav('/dashboard')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">dashboard</span>
                  <span>Dashboard Overview</span>
                </button>
                <button
                  onClick={() => handleNav('/study-planner')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">assignment</span>
                  <span>Study Planner</span>
                </button>
                <button
                  onClick={() => handleNav('/calendar')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                  <span>Academic Calendar</span>
                </button>
                <button
                  onClick={() => handleNav('/syllabus-tracker')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">fact_check</span>
                  <span>Syllabus Tracker</span>
                </button>
                <button
                  onClick={() => handleNav('/focus-timer')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
                  <span>Pomodoro Focus Timer</span>
                </button>
                <button
                  onClick={() => handleNav('/ai-assistant')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#2F6FED]">auto_awesome</span>
                  <span>AI Study Assistant</span>
                </button>
              </div>
            </div>

            {/* Sustainability Section */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-outline px-2 block mb-1">
                WaterWatch Sustainability
              </span>
              <div className="space-y-0.5">
                <button
                  onClick={() => handleNav('/waterwatch')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#138A72]">water_drop</span>
                  <span>Conservation Telemetry</span>
                </button>
                <button
                  onClick={() => handleNav('/report-water-issue')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#138A72]">report_problem</span>
                  <span>Report Water Leak</span>
                </button>
                <button
                  onClick={() => handleNav('/my-reports')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#138A72]">eco</span>
                  <span>My Submitted Reports</span>
                </button>
              </div>
            </div>

            {/* System / Admin */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-outline px-2 block mb-1">
                System & Operations
              </span>
              <div className="space-y-0.5">
                {role === 'admin' && (
                  <button
                    onClick={() => handleNav('/admin')}
                    className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[18px] text-amber-700">shield_person</span>
                    <span>Admin Maintenance Triage</span>
                  </button>
                )}
                <button
                  onClick={() => handleNav('/analytics')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">insights</span>
                  <span>Analytics & Trends</span>
                </button>
                <button
                  onClick={() => handleNav('/notifications')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">notifications</span>
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => handleNav('/settings')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">settings</span>
                  <span>Settings & Profile</span>
                </button>
                <button
                  onClick={() => handleNav('/demo-portal')}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-primary hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">science</span>
                  <span>Demo Experience Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Version Footer */}
        <div className="p-3 border-t border-border-neutral text-center bg-warm-surface">
          <span className="text-[10px] text-secondary-text">SmartCampus 360 v2.4 • Academic Horizon</span>
        </div>
      </div>
    </div>
  );
};
