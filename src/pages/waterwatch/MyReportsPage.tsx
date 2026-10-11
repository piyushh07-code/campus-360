import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ReportStatus } from '../../types';

export const MyReportsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { waterReports } = useData();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter reports submitted by current user (or show all in demo student mode so user can see activity)
  const myReports = waterReports.filter((r) => {
    const isMine = r.reportedBy === currentUser.uid || r.reporterEmail === currentUser.email;
    return isMine;
  });

  const displayReports = myReports.length > 0 ? myReports : waterReports.slice(0, 4);

  const filtered = displayReports.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#138A72] font-semibold">
              Personal Sustainability Ledger
            </span>
            <span>•</span>
            <span className="font-label-sm text-[11px] text-outline">Campus Incident Tracking</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            My Water Incident Reports
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Review status updates, technician notes, and verified water conservation impact from your submissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-semibold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Triage</option>
            <option value="in_progress">Dispatched</option>
            <option value="resolved">Resolved</option>
          </select>

          <Link
            to="/report-water-issue"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#07866E] hover:bg-[#056E5A] text-white text-xs font-bold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Report New Issue</span>
          </Link>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {filtered.map((report) => (
          <div
            key={report.id}
            className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral hover:shadow-md transition-shadow flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border-neutral/60">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-main-text">#{report.id}</span>
                <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-main-text font-bold text-xs">
                  {report.building}
                </span>
                <span className="text-xs text-secondary-text font-medium">{report.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge type="waterPriority" value={report.priority} />
                <StatusBadge type="waterStatus" value={report.status} />
              </div>
            </div>

            <p className="text-xs text-main-text leading-relaxed font-medium">{report.description}</p>

            {report.photoUrl && (
              <div className="my-1">
                <img
                  src={report.photoUrl}
                  alt="Incident photo"
                  className="max-h-36 rounded-lg object-cover border border-border-neutral"
                />
              </div>
            )}

            {/* Technician & Resolution Status Box */}
            <div className="p-3 rounded-xl bg-surface-container-low border border-border-neutral/60 text-xs flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-outline">Assigned Technician:</span>
                <strong className="text-main-text">
                  {report.assignedTechnician || 'Awaiting dispatch assignment in triage'}
                </strong>
              </div>

              {report.resolutionNotes && (
                <div className="pt-1.5 border-t border-border-neutral/40 flex items-start gap-1.5 text-emerald-900">
                  <span className="material-symbols-outlined text-[16px] text-emerald-700 shrink-0 mt-0.5">
                    task_alt
                  </span>
                  <span>
                    <strong>Resolution Note:</strong> {report.resolutionNotes}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-outline pt-1">
              <span>Submitted: {new Date(report.createdAt).toLocaleString()}</span>
              {report.estimatedGallonsSavedPerHour && (
                <span className="text-[#138A72] font-semibold">
                  Estimated Saved: ~{report.estimatedGallonsSavedPerHour * 24} gal/day upon resolution
                </span>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-border-neutral">
            <span className="material-symbols-outlined text-[42px] text-outline mb-2">water_drop</span>
            <p className="text-sm font-semibold text-main-text">No water reports match this status.</p>
            <Link
              to="/report-water-issue"
              className="mt-3 inline-block text-xs text-primary font-bold hover:underline"
            >
              + File a campus leak report
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
