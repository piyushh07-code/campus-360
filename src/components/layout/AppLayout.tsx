import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileDrawer } from './MobileDrawer';
import { DemoBanner } from '../common/DemoBanner';

export const AppLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface antialiased">
      {/* Top Demo Environment Bar */}
      <DemoBanner />

      {/* Desktop Persistent Sidebar (≥1024px) */}
      <Sidebar />

      {/* Top Application Header */}
      <TopHeader onOpenMobileMenu={() => setIsDrawerOpen(true)} />

      {/* Mobile Drawer (Menu Sheet) */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 w-full min-w-0">
        <main className="relative pt-16 bg-surface min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6 w-full max-w-7xl mx-auto pb-24 lg:pb-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom 5-Tab Bar (<1024px) */}
      <MobileBottomNav onOpenDrawer={() => setIsDrawerOpen(true)} />
    </div>
  );
};
