import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { role } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-space-sm py-2 rounded-lg transition-all font-label-md text-label-md ${
      isActive
        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
    }`;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 hidden lg:flex flex-col justify-between py-space-md border-r border-border-neutral overflow-y-auto">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="px-space-md pb-space-lg">
          <Logo size="md" />
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-space-md px-space-sm">
          {/* Core Academic Workspace */}
          <div className="flex flex-col gap-1">
            <span className="px-space-sm font-label-sm text-[10px] text-outline tracking-wider uppercase font-semibold">
              Core Workspace
            </span>
            <NavLink to="/dashboard" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">dashboard</span>
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/study-planner" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">assignment</span>
                <span>Study Planner</span>
              </div>
            </NavLink>
            <NavLink to="/calendar" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">calendar_today</span>
                <span>Calendar</span>
              </div>
            </NavLink>
            <NavLink to="/syllabus-tracker" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">fact_check</span>
                <span>Syllabus Tracker</span>
              </div>
            </NavLink>
            <NavLink to="/focus-timer" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">timer</span>
                <span>Focus Timer</span>
              </div>
            </NavLink>
            <NavLink to="/ai-assistant" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-[#2F6FED]">auto_awesome</span>
                <span>AI Study Assistant</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px]">
                Smart
              </span>
            </NavLink>
          </div>

          {/* Sustainability Pillar */}
          <div className="flex flex-col gap-1">
            <span className="px-space-sm font-label-sm text-[10px] text-outline tracking-wider uppercase font-semibold">
              Sustainability
            </span>
            <NavLink to="/waterwatch" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-[#138A72]">water_drop</span>
                <span>WaterWatch</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px]">
                Live
              </span>
            </NavLink>
            <NavLink to="/report-water-issue" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-[#138A72]">report_problem</span>
                <span>Report Issue</span>
              </div>
            </NavLink>
            <NavLink to="/my-reports" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-[#138A72]">eco</span>
                <span>My Reports</span>
              </div>
            </NavLink>
          </div>

          {/* Administration / System */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-space-sm">
              <span className="font-label-sm text-[10px] text-outline tracking-wider uppercase font-semibold">
                System
              </span>
              {role === 'admin' && (
                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                  ADMIN
                </span>
              )}
            </div>

            {role === 'admin' ? (
              <NavLink to="/admin" className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[19px] text-amber-600">shield_person</span>
                  <span>Maintenance Triage</span>
                </div>
                <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-secondary text-[9px] font-medium">
                  Dispatch
                </span>
              </NavLink>
            ) : null}

            <NavLink to="/analytics" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">insights</span>
                <span>Analytics Hub</span>
              </div>
            </NavLink>
            <NavLink to="/notifications" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">notifications</span>
                <span>Notifications</span>
              </div>
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">settings</span>
                <span>Settings</span>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Footer Environmental Tier Badge */}
      <div className="px-space-md pt-space-md border-t border-border-neutral/60">
        <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-border-neutral/50">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[#138A72] text-[20px]">nest_eco_leaf</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">Campus Green Tier</span>
              <span className="font-label-sm text-[10px] text-outline">Tier A+ Active</span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-[#138A72] font-bold">98%</span>
        </div>
      </div>
    </aside>
  );
};
