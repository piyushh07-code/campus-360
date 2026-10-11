import React from 'react';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/common/MetricCard';

export const AnalyticsPage: React.FC = () => {
  const { tasks, courses, focusSessions, waterReports } = useData();

  // Academic Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const allTopics = courses.flatMap((c) => c.topics);
  const completedTopics = allTopics.filter((t) => t.completed).length;
  const totalTopics = allTopics.length;
  const syllabusMasteryRate = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const totalFocusMinutes = focusSessions.reduce((acc, s) => acc + s.durationMinutes, 0);

  // Sustainability Metrics
  const totalWaterReports = waterReports.length;
  const resolvedReportsList = waterReports.filter((r) => r.status === 'resolved');
  const resolvedWaterReports = resolvedReportsList.length;
  const pendingWaterReports = waterReports.filter((r) => r.status === 'pending').length;
  const inProgressWaterReports = waterReports.filter((r) => r.status === 'in_progress').length;
  const resolutionRate =
    totalWaterReports > 0 ? Math.round((resolvedWaterReports / totalWaterReports) * 100) : 0;

  const estimatedGallonsTotal = resolvedReportsList.reduce((acc, r) => {
    return acc + Math.round((r.estimatedGallonsSavedPerHour || 2.0) * 24);
  }, 0);

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col pb-2 border-b border-border-neutral">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
            Institutional Telemetry Matrix
          </span>
          <span>•</span>
          <span className="font-label-sm text-[11px] text-primary font-semibold">Cross-Pillar Data Hub</span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
          Campus Intelligence &amp; Resource Analytics
        </h1>
        <p className="font-body-md text-sm text-secondary-text mt-0.5">
          Unified analysis quantifying student cognitive velocity and facilities water conservation impact.
        </p>
      </div>

      {/* Top 4 Cross-Domain Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Study Task Completion"
          value={`${taskCompletionRate}%`}
          unit="velocity"
          badgeText={`${completedTasks} of ${totalTasks} Done`}
          badgeType="primary"
          progress={taskCompletionRate}
          progressColor="bg-[#2F6FED]"
          footerLeft="Daily Sprint Pacing"
          footerHighlight="Optimal"
        />

        <MetricCard
          label="Syllabus Mastery"
          value={`${syllabusMasteryRate}%`}
          unit="curriculum"
          badgeText={`${completedTopics}/${totalTopics} Units`}
          badgeType="secondary"
          progress={syllabusMasteryRate}
          progressColor="bg-indigo-600"
          footerLeft="Term Coverage Ratio"
          footerRight="4 Courses"
        />

        <MetricCard
          label="Deep Focus Output"
          value={totalFocusMinutes}
          unit="minutes total"
          badgeText="Pomodoro Logged"
          badgeType="tertiary"
          footerLeft="Weekly target: 300m"
          footerHighlight={`${Math.round(totalFocusMinutes / 60)} hrs active`}
        />

        <MetricCard
          label="Estimated Water Conserved"
          value={`${estimatedGallonsTotal.toLocaleString()}`}
          unit="gal (est.)"
          badgeText={`${resolutionRate}% Resolved`}
          badgeType="tertiary"
          progress={resolutionRate}
          progressColor="bg-[#138A72]"
          footerLeft="Campus Impact"
          footerHighlight="Tier A+ Active"
        />
      </div>

      {/* Split Analytics Pillars: Left Academic / Right Sustainability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* PILLAR 1: SMARTSTUDY AI ACADEMIC METRICS */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">psychology</span>
              <h2 className="font-headline-sm text-lg font-bold text-main-text">
                Academic Cognitive Velocity
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-xs font-semibold">
              SmartStudy AI
            </span>
          </div>

          {/* Course-Wise Syllabus Progress Breakdown */}
          <div className="space-y-4">
            <span className="font-label-sm text-xs font-semibold text-outline uppercase tracking-wider block">
              Syllabus Coverage by Subject:
            </span>

            {courses.map((course) => {
              const comp = course.topics.filter((t) => t.completed).length;
              const total = course.topics.length;
              const pct = total > 0 ? Math.round((comp / total) * 100) : 0;

              return (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-main-text">{course.code}: {course.name}</span>
                    <span className="font-semibold text-secondary-text">{comp}/{total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: course.color || '#2F6FED' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Task Priority Distribution */}
          <div className="pt-4 border-t border-border-neutral space-y-3">
            <span className="font-label-sm text-xs font-semibold text-outline uppercase tracking-wider block">
              Task Priority Distribution:
            </span>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-outline block text-[10px] uppercase font-bold">Low</span>
                <span className="text-base font-bold text-main-text mt-1 block">
                  {tasks.filter((t) => t.priority === 'low').length}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-secondary-text block text-[10px] uppercase font-bold">Medium</span>
                <span className="text-base font-bold text-main-text mt-1 block">
                  {tasks.filter((t) => t.priority === 'medium').length}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="text-amber-800 block text-[10px] uppercase font-bold">High</span>
                <span className="text-base font-bold text-amber-900 mt-1 block">
                  {tasks.filter((t) => t.priority === 'high').length}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                <span className="text-red-800 block text-[10px] uppercase font-bold">Urgent</span>
                <span className="text-base font-bold text-red-900 mt-1 block">
                  {tasks.filter((t) => t.priority === 'urgent').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PILLAR 2: WATERWATCH SUSTAINABILITY METRICS */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#138A72] text-[22px]">water_drop</span>
              <h2 className="font-headline-sm text-lg font-bold text-main-text">
                WaterWatch Incident &amp; Flow Metrics
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
              Sustainability
            </span>
          </div>

          {/* Ticket Lifecycle Distribution Bar */}
          <div className="space-y-2">
            <span className="font-label-sm text-xs font-semibold text-outline uppercase tracking-wider block">
              Ticket Lifecycle Status Breakdown:
            </span>

            <div className="w-full bg-surface-container-low h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-amber-400 h-full"
                style={{ width: `${(pendingWaterReports / (totalWaterReports || 1)) * 100}%` }}
                title={`Pending: ${pendingWaterReports}`}
              />
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(inProgressWaterReports / (totalWaterReports || 1)) * 100}%` }}
                title={`In Progress: ${inProgressWaterReports}`}
              />
              <div
                className="bg-[#138A72] h-full"
                style={{ width: `${(resolvedWaterReports / (totalWaterReports || 1)) * 100}%` }}
                title={`Resolved: ${resolvedWaterReports}`}
              />
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <span className="flex items-center gap-1.5 text-amber-800 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                Pending ({pendingWaterReports})
              </span>
              <span className="flex items-center gap-1.5 text-blue-800 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Dispatched ({inProgressWaterReports})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#138A72]"></span>
                Resolved ({resolvedWaterReports})
              </span>
            </div>
          </div>

          {/* Estimated Gallons by Issue Classification */}
          <div className="pt-4 border-t border-border-neutral space-y-3">
            <span className="font-label-sm text-xs font-semibold text-outline uppercase tracking-wider block">
              Estimated Loss Rate by Fault Type:
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-semibold text-main-text">Pipe Burst / Joint Rupture</span>
                <span className="text-red-700 font-bold">~18.5 gal/hr</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-semibold text-main-text">Tank Overflow / Float Failure</span>
                <span className="text-amber-700 font-bold">~24.0 gal/hr</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-semibold text-main-text">Leaking Tap / Dripping Faucet</span>
                <span className="text-blue-700 font-bold">~1.8 gal/hr</span>
              </div>
            </div>
          </div>

          {/* Transparency note */}
          <p className="text-[11px] text-outline italic pt-2 border-t border-border-neutral/40">
            * All gallons conserved are calculations based on reported fixture flowrates and turnaround hours.
          </p>
        </div>
      </div>
    </div>
  );
};
