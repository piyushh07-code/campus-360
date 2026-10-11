import React from 'react';
import { NavLink } from 'react-router-dom';

interface MobileBottomNavProps {
  onOpenDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenDrawer }) => {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
      isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
    }`;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-border-neutral lg:hidden pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around h-16 px-1">
        <NavLink to="/dashboard" className={navItemClass}>
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          <span className="text-[10px] tracking-tight mt-0.5">Overview</span>
        </NavLink>

        <NavLink to="/study-planner" className={navItemClass}>
          <span className="material-symbols-outlined text-[22px]">assignment</span>
          <span className="text-[10px] tracking-tight mt-0.5">Planner</span>
        </NavLink>

        <NavLink to="/waterwatch" className={navItemClass}>
          <div className="relative">
            <span className="material-symbols-outlined text-[22px] text-[#138A72]">water_drop</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#138A72]"></span>
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 text-[#138A72] font-semibold">WaterWatch</span>
        </NavLink>

        <NavLink to="/ai-assistant" className={navItemClass}>
          <span className="material-symbols-outlined text-[22px] text-[#2F6FED]">auto_awesome</span>
          <span className="text-[10px] tracking-tight mt-0.5">AI Study</span>
        </NavLink>

        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center flex-1 py-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Open More Menu"
        >
          <span className="material-symbols-outlined text-[22px]">grid_view</span>
          <span className="text-[10px] tracking-tight mt-0.5">More</span>
        </button>
      </div>
    </nav>
  );
};
