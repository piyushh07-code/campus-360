import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const { currentUser, role } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-8 border-b border-border-neutral">
      {/* Mobile Drawer Trigger & Brand Logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          aria-label="Open Navigation Drawer"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <Link to="/dashboard" className="flex items-center gap-1.5">
          <div className="flex items-baseline">
            <span className="font-extrabold text-[17px] text-[#17365D]">SmartCampus</span>
            <span className="font-extrabold text-[17px] text-[#2F6FED] ml-0.5">360</span>
          </div>
        </Link>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden lg:flex items-center gap-space-md flex-1 max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-16 bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border-neutral/60"
            placeholder="Search tasks, syllabi, or water reports..."
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/study-planner');
              }
            }}
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Action Icons & User Profile */}
      <div className="flex items-center gap-2 sm:gap-space-md">
        {/* Dormitory Conservation Live Pill */}
        <Link
          to="/waterwatch"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[16px] text-tertiary">water_drop</span>
          <span className="font-label-sm text-label-sm font-semibold">Dormitory Conservation: -18% gal</span>
        </Link>

        {/* Notifications Button */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
          aria-label="View Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-white"></span>
          )}
        </Link>

        {/* Quick Report Water Issue Button on Header */}
        <Link
          to="/report-water-issue"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tertiary-container text-white text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[16px]">water_drop</span>
          <span>Report Leak</span>
        </Link>

        {/* User Profile Capsule */}
        <Link
          to="/settings"
          className="flex items-center gap-space-sm pl-2 py-1 pr-1.5 rounded-full hover:bg-surface-container transition-colors"
        >
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
              {currentUser.name}
            </span>
            <span className="font-label-sm text-[10px] text-outline">
              {role === 'admin' ? "Facilities Admin '24" : currentUser.year || "BioEng '26"}
            </span>
          </div>
          <img
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-border-neutral bg-surface-dim"
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
          />
        </Link>
      </div>
    </header>
  );
};
