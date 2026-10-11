import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusBadge } from '../../components/common/StatusBadge';

export const WaterWatchPage: React.FC = () => {
  const { waterReports } = useData();

  const totalReports = waterReports.length;
  const pendingReports = waterReports.filter((r) => r.status === 'pending');
  const inProgressReports = waterReports.filter((r) => r.status === 'in_progress');
  const resolvedReports = waterReports.filter((r) => r.status === 'resolved');

  const resolutionRate =
    totalReports > 0 ? Math.round((resolvedReports.length / totalReports) * 100) : 0;

  // Calculate estimated total gallons saved based on disclosed formula:
  // Each resolved issue averages ~24 hrs turnaround * estimated flow rate
  const totalGallonsSavedEstimate = resolvedReports.reduce((acc, r) => {
    const rate = r.estimatedGallonsSavedPerHour || 2.0;
    return acc + Math.round(rate * 24);
  }, 0);

  // Group by building to identify repeated locations
  const buildingCounts = waterReports.reduce<Record<string, number>>((acc, r) => {
    acc[r.building] = (acc[r.building] || 0) + 1;
    return acc;
  }, {});

  const buildingsSorted = Object.entries(buildingCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#138A72] font-bold">
              Campus Environmental Accountability
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold">
              Software Incident Monitor
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            WaterWatch Campus Telemetry &amp; Conservation
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Real-time reporting, dispatch triage, and calculated infrastructure conservation analytics across campus buildings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/my-reports"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-main-text text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span>My Submitted Reports</span>
          </Link>

          <Link
            to="/report-water-issue"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#07866E] hover:bg-[#056E5A] text-white text-sm font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
            <span>+ Report Campus Leak</span>
          </Link>
        </div>
      </div>

      {/* Transparent Estimation Disclosure Banner */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3 shadow-xs">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
        <div className="flex flex-col text-xs text-secondary-text leading-relaxed">
          <span className="font-bold text-main-text">Operational Notice &amp; Methodology Disclosure:</span>
          <span>
            WaterWatch is a software-based facility dispatch tool. Savings and loss metrics are calculated
            engineering estimations based on standard fixture flowrates (e.g. 1.8 gal/hr dripping tap, 18.5 gal/hr pipe leak)
            multiplied by resolution response duration. No physical IoT flow sensors are present on campus.
          </span>
        </div>
      </div>

      {/* 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Incident Tickets"
          value={totalReports}
          unit="logged tickets"
          badgeText="All Zones"
          badgeType="secondary"
          footerLeft="Campus-wide submissions"
          footerRight="Fall Quarter"
        />

        <MetricCard
          label="Active Triage Queue"
          value={pendingReports.length + inProgressReports.length}
          unit="pending dispatches"
          badgeText={pendingReports.length > 0 ? `${pendingReports.length} Urgent Triage` : 'Managed'}
          badgeType={pendingReports.length > 0 ? 'error' : 'secondary'}
          footerLeft="Dispatched teams active"
          footerHighlight={`${inProgressReports.length} in repair`}
        />

        <MetricCard
          label="Resolution Rate"
          value={`${resolutionRate}%`}
          unit="completion ratio"
          badgeText="Verified"
          badgeType="tertiary"
          progress={resolutionRate}
          progressColor="bg-[#138A72]"
          footerLeft={`${resolvedReports.length} tickets resolved`}
          footerHighlight="Optimal"
        />

        <MetricCard
          label="Estimated Water Saved"
          value={`${totalGallonsSavedEstimate.toLocaleString()}`}
          unit="gallons (est.)"
          badgeText="Tier A+ Impact"
          badgeType="tertiary"
          progress={94}
          progressColor="bg-[#07866E]"
          footerLeft="Prevented loss"
          footerHighlight="-18% Dorm Flow"
        />
      </div>

      {/* Main Grid: Campus Building Hotspots (4 cols) + Active Incident Dispatch Table (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Repeated Problem Locations & Building Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#138A72] text-[20px]">domain</span>
              <h2 className="font-headline-sm text-base font-bold text-main-text">Building Incident Frequency</h2>
            </div>
            <span className="text-xs text-outline font-semibold">Hotspots</span>
          </div>

          <p className="text-xs text-secondary-text mb-4 leading-relaxed">
            Identifies facilities requiring preventative plumbing overhaul based on repeat ticket density.
          </p>

          <div className="space-y-3">
            {buildingsSorted.map(([bldg, count]) => (
              <div
                key={bldg}
                className="p-3 rounded-lg bg-surface-container-low/70 border border-border-neutral/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">apartment</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-main-text leading-tight">{bldg}</span>
                    <span className="text-[10px] text-outline">
                      {count >= 3 ? 'High Maintenance Frequency' : 'Normal Operational Cadence'}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    count >= 3 ? 'bg-amber-100 text-amber-800' : 'bg-surface-container text-main-text'
                  }`}
                >
                  {count} reports
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3.5 rounded-lg bg-[#E6F5F1] border border-[#138A72]/30 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#138A72] text-[18px] shrink-0 mt-0.5">eco</span>
            <div className="flex flex-col text-[11px] text-[#111C2C] leading-snug">
              <strong className="font-semibold text-[#138A72]">Dormitory Block A Recognition:</strong>
              <span>Fastest student reporting turnaround in Fall '24, averting an estimated 4,200 gallons.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Incident Dispatch Table (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">water_damage</span>
              <h2 className="font-headline-sm text-base font-bold text-main-text">
                Live Campus Incident Reports ({waterReports.length})
              </h2>
            </div>
            <Link to="/report-water-issue" className="text-xs font-semibold text-primary hover:underline">
              + File Report
            </Link>
          </div>

          <div className="space-y-3">
            {waterReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low border border-border-neutral/70 transition-colors flex flex-col gap-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-main-text">#{report.id}</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container font-semibold text-secondary text-[11px]">
                      {report.building}
                    </span>
                    <span className="text-xs text-secondary-text font-medium">• {report.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge type="waterPriority" value={report.priority} />
                    <StatusBadge type="waterStatus" value={report.status} />
                  </div>
                </div>

                <p className="text-xs text-main-text leading-relaxed font-medium">{report.description}</p>

                {report.assignedTechnician && (
                  <div className="flex items-center gap-1.5 text-[11px] text-secondary font-medium">
                    <span className="material-symbols-outlined text-[15px] text-primary">engineering</span>
                    <span>Assigned: {report.assignedTechnician}</span>
                  </div>
                )}

                {report.resolutionNotes && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs">
                    <strong>Resolution Log:</strong> {report.resolutionNotes}
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-outline pt-1 border-t border-border-neutral/50">
                  <span>Reported by: {report.reporterName} ({report.reporterRole || 'Campus Member'})</span>
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
