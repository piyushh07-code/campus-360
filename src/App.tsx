import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Providers
import { AppLayout } from './components/layout/AppLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { DemoPortalPage } from './pages/auth/DemoPortalPage';

// Main Application Pages
import { StudentDashboardPage } from './pages/dashboard/StudentDashboardPage';
import { StudyPlannerPage } from './pages/study/StudyPlannerPage';
import { AcademicCalendarPage } from './pages/study/AcademicCalendarPage';
import { SyllabusTrackerPage } from './pages/study/SyllabusTrackerPage';
import { FocusTimerPage } from './pages/study/FocusTimerPage';
import { AiAssistantPage } from './pages/study/AiAssistantPage';
import { WaterWatchPage } from './pages/waterwatch/WaterWatchPage';
import { ReportWaterIssuePage } from './pages/waterwatch/ReportWaterIssuePage';
import { MyReportsPage } from './pages/waterwatch/MyReportsPage';
import { AdminMaintenancePage } from './pages/admin/AdminMaintenancePage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication & Demo Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/demo-portal" element={<DemoPortalPage />} />

        {/* Authenticated Application Routes wrapped in AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route path="/study-planner" element={<StudyPlannerPage />} />
          <Route path="/calendar" element={<AcademicCalendarPage />} />
          <Route path="/syllabus-tracker" element={<SyllabusTrackerPage />} />
          <Route path="/focus-timer" element={<FocusTimerPage />} />
          <Route path="/ai-assistant" element={<AiAssistantPage />} />
          <Route path="/waterwatch" element={<WaterWatchPage />} />
          <Route path="/report-water-issue" element={<ReportWaterIssuePage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/admin" element={<AdminMaintenancePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
