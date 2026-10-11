import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Logo } from '../../components/common/Logo';

export const DemoPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo, isDemoMode } = useAuth();
  const { resetAllData } = useData();

  const [adminToken, setAdminToken] = useState('STANFORD-DEMO-2024');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSelectStudent = async () => {
    await loginAsDemo('student');
    navigate('/dashboard');
  };

  const handleSelectAdmin = async () => {
    await loginAsDemo('admin');
    navigate('/admin');
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all demo local storage data back to initial seeds?')) {
      setIsResetting(true);
      resetAllData();
      setTimeout(() => {
        setIsResetting(false);
        setResetSuccess(true);
        setTimeout(() => setResetSuccess(false), 3000);
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between">
      {/* Top Bar Header */}
      <header className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              title="Return to login"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <Logo size="md" showText={true} />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-tertiary/10 text-tertiary">
            Interactive Sandbox
          </span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Header Introduction */}
        <div className="flex flex-col items-start gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[15px]">science</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Interactive Evaluation Mode</span>
          </div>
          <h1 className="font-newsreader text-3xl sm:text-4xl font-medium text-on-surface">
            Demo Experience Portal
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Explore SmartCampus 360 with pre-configured illustrative sandbox profiles. Experience real-time academic workflows and dorm sustainability telemetry without connecting live registrar records.
          </p>
        </div>

        {/* Illustrative Telemetry Disclaimer Notice */}
        <div className="w-full bg-surface-container rounded-2xl p-4 border border-outline-variant/30 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-sm font-semibold text-on-surface">
                Illustrative Sandbox Telemetry Notice
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All course syllabi, Pomodoro logs, water fixture alerts, and flow telemetry in demo mode are simulated educational benchmarks. No physical campus sensors or live Gradescope records are modified.
              </p>
            </div>
          </div>
        </div>

        {/* Personas Section */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs uppercase tracking-wider text-outline font-semibold">
            Pre-Provisioned Sandbox Personas
          </span>
          <span className="text-xs text-primary font-medium">2 Verified Roles</span>
        </div>

        {/* Card 1: Elena Rostova (Student Persona) */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-5 border border-primary/20 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>
          
          <div className="flex items-start justify-between gap-3 pt-1 mb-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Elena Vance"
                  className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-tertiary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="font-newsreader text-xl font-medium text-on-surface truncate">
                  Elena Rostova (Vance)
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Bioengineering Junior • Class of '26 • Roble Hall
                </span>
              </div>
            </div>
            <span className="inline-flex px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
              Student Sandbox
            </span>
          </div>

          {/* Feature Highlights */}
          <div className="bg-surface-container-low rounded-xl p-3.5 mb-4 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">psychology</span>
              <span className="text-on-surface">SmartStudy AI Assistant with adaptive formula drills and flashcards</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">fact_check</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-on-surface">Interactive Syllabus Tracker</span>
                  <span className="font-bold text-primary">32/50 mastered (64%)</span>
                </div>
                <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary text-[17px] shrink-0 mt-0.5">water_drop</span>
              <span className="text-on-surface">WaterWatch issue reporting & dorm conservation leaderboards</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSelectStudent}
            className="w-full min-h-[46px] px-4 py-2.5 bg-primary text-white hover:bg-primary-dark rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
          >
            <span>Enter as Elena Rostova (Student Demo)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Card 2: Facilities Administrator (Marcus Vance) */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-5 border border-tertiary/20 shadow-sm relative overflow-hidden group hover:border-tertiary/50 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-tertiary"></div>

          <div className="flex items-start justify-between gap-3 pt-1 mb-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-13 h-13 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                <span className="material-symbols-outlined text-[24px]">shield_person</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="font-newsreader text-xl font-medium text-on-surface truncate">
                  Facilities Administrator
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Marcus Vance • Campus Operations Dispatcher (Team B Lead)
                </span>
              </div>
            </div>
            <span className="inline-flex px-2.5 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-semibold shrink-0">
              Operations Lead
            </span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-3.5 mb-4 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary text-[17px] shrink-0 mt-0.5">plumbing</span>
              <span className="text-on-surface">Campus-wide maintenance triage, work order assignment, and status dispatch</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary text-[17px] shrink-0 mt-0.5">analytics</span>
              <span className="text-on-surface">Estimated water loss analytics, repeat hotspot detection, and CSV audit export</span>
            </div>
          </div>

          {/* Pre-filled Token Field */}
          <div className="mb-4">
            <label className="block text-[11px] text-on-surface-variant mb-1 font-semibold uppercase tracking-wider">
              Demo Access Passkey
            </label>
            <div className="w-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-between px-3 h-10 rounded-xl">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-outline text-[16px]">key</span>
                <span className="text-xs font-mono tracking-wider text-on-surface">••••-••••-{adminToken}</span>
              </div>
              <div className="flex items-center gap-1 text-tertiary text-xs font-medium shrink-0 ml-2">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Pre-Authorized</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSelectAdmin}
            className="w-full min-h-[46px] px-4 py-2.5 bg-tertiary text-white hover:bg-tertiary-dark rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
          >
            <span>Enter as Facilities Administrator (Admin Demo)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Demo Management Controls */}
        <div className="p-4 rounded-2xl bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">restore</span>
            <span>Need a fresh sandbox state? Reset cached reports and focus logs.</span>
          </div>
          <button
            type="button"
            onClick={handleResetData}
            disabled={isResetting}
            className="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold transition-all border border-outline-variant/30 shrink-0"
          >
            {isResetting ? 'Resetting...' : resetSuccess ? 'Reset Complete!' : 'Reset Demo Seeds'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-[11px] text-on-surface-variant border-t border-outline-variant/20">
        <p>© 2026 SmartCampus 360 • Stanford University Student Life & Facilities Engineering</p>
      </footer>
    </div>
  );
};
