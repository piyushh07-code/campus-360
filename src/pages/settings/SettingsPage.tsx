import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const SettingsPage: React.FC = () => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { resetDemoData } = useData();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  const [waterAlerts, setWaterAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300 max-w-4xl">
      {/* Title */}
      <div className="flex flex-col pb-2 border-b border-border-neutral">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
            Identity &amp; Configuration
          </span>
          <span>•</span>
          <span className="font-label-sm text-[11px] text-outline">User Preferences</span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
          Profile &amp; Application Settings
        </h1>
        <p className="font-body-md text-sm text-secondary-text mt-0.5">
          Manage your verified campus persona credentials, role elevations, and notification preferences.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-700">check_circle</span>
          <span>Profile configuration preferences successfully updated!</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <img
          alt={currentUser.name}
          className="w-20 h-20 rounded-full object-cover ring-4 ring-border-neutral bg-surface-dim shrink-0"
          src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
        />

        <div className="flex flex-col flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-headline-sm text-xl font-bold text-main-text leading-tight">
                {currentUser.name}
              </h2>
              <span className="text-xs text-secondary-text font-medium">{currentUser.email}</span>
            </div>

            <div className="flex items-center gap-2 self-center sm:self-auto">
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold uppercase tracking-wider">
                {role === 'admin' ? 'Facilities Admin' : 'Student'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-secondary-text">
            <div>
              <strong className="text-main-text">Department:</strong> {currentUser.department}
            </div>
            <div>
              <strong className="text-main-text">Class Cohort:</strong> {currentUser.year}
            </div>
            <div>
              <strong className="text-main-text">Residential Hub:</strong> {currentUser.dormitory}
            </div>
            <div>
              <strong className="text-main-text">Enrollment Status:</strong> Active Fall 2024
            </div>
          </div>
        </div>
      </div>

      {/* Role Elevation Persona Switcher Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral">
        <h2 className="font-headline-sm text-base font-bold text-main-text mb-1">
          Persona Elevation &amp; Access Controls
        </h2>
        <p className="text-xs text-secondary-text mb-4 leading-relaxed">
          Switch between the student academic learner persona and the facilities operations administrative dispatcher.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => switchRole('student')}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              role === 'student'
                ? 'bg-blue-50/70 border-primary ring-2 ring-primary/20 shadow-xs'
                : 'bg-surface-container-low border-border-neutral hover:bg-surface-container'
            }`}
          >
            <div>
              <span className="text-xs font-bold text-main-text block">Student Mode (Elena Vance)</span>
              <span className="text-[11px] text-secondary-text mt-1 block">
                Access Study Planner, Syllabus Tracker, Pomodoro Timer, AI Assistant, and personal leak reporting.
              </span>
            </div>
            {role === 'student' && (
              <span className="mt-3 text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Active Persona
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => switchRole('admin')}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              role === 'admin'
                ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                : 'bg-surface-container-low border-border-neutral hover:bg-surface-container'
            }`}
          >
            <div>
              <span className="text-xs font-bold text-main-text block">Facilities Administrator (Marcus Vance)</span>
              <span className="text-[11px] text-secondary-text mt-1 block">
                Access operational triage dispatch, assign plumbing work orders, change ticket statuses, and export CSV.
              </span>
            </div>
            {role === 'admin' && (
              <span className="mt-3 text-[10px] text-amber-800 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                Active Admin Persona
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <form onSubmit={handleSave} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral space-y-4">
        <h2 className="font-headline-sm text-base font-bold text-main-text">
          Broadcast &amp; Notification Toggles
        </h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/60 border border-border-neutral/60 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-main-text block">Push Notifications</span>
              <span className="text-[11px] text-secondary-text">Receive real-time system and academic alerts</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/60 border border-border-neutral/60 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-main-text block">Exam &amp; Lab T-48h Reminders</span>
              <span className="text-[11px] text-secondary-text">Notify 48 hours prior to syllabus milestones</span>
            </div>
            <input
              type="checkbox"
              checked={examReminders}
              onChange={(e) => setExamReminders(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/60 border border-border-neutral/60 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-main-text block">WaterWatch Dispatch Alerts</span>
              <span className="text-[11px] text-secondary-text">Receive updates when technicians resolve reported dorm leaks</span>
            </div>
            <input
              type="checkbox"
              checked={waterAlerts}
              onChange={(e) => setWaterAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm transition-all"
          >
            Save Preferences
          </button>
        </div>
      </form>

      {/* Data Management & Factory Reset */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-sm text-base font-bold text-main-text">
            Sandbox Data Management
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Reset all tasks, completed checkboxes, and reported leak tickets to initial demo state.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all demo state to initial factory values?')) {
              resetDemoData();
              alert('Demo data has been restored.');
            }
          }}
          className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-main-text text-xs font-semibold self-start sm:self-auto"
        >
          Reset Demo Data
        </button>
      </div>

      {/* Logout Action */}
      <div className="flex justify-start">
        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-error hover:bg-error-container text-xs font-bold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out of Session</span>
        </button>
      </div>
    </div>
  );
};
