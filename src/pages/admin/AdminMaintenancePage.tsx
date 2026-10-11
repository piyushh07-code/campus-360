import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { WaterReport, ReportStatus } from '../../types';

export const AdminMaintenancePage: React.FC = () => {
  const { role, switchRole } = useAuth();
  const { waterReports, updateWaterReportStatus } = useData();

  const [filterBuilding, setFilterBuilding] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Status Update Modal state
  const [activeReport, setActiveReport] = useState<WaterReport | null>(null);
  const [newStatus, setNewStatus] = useState<ReportStatus>('in_progress');
  const [technician, setTechnician] = useState('Tech Carlos Mendoza (Plumbing Team B)');
  const [resolutionNotes, setResolutionNotes] = useState('');

  // Access check
  if (role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto my-12 bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-border-neutral text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[36px]">lock</span>
        </div>
        <h1 className="text-xl font-headline-lg font-bold text-main-text mb-2">
          Restricted Facilities Administration Portal
        </h1>
        <p className="text-sm text-secondary-text mb-6">
          You are currently in <strong>Student Mode</strong>. Administrative operations (incident triage, technician
          dispatch, work order resolution notes, and CSV export) require authorized administrative privileges.
        </p>
        <button
          onClick={() => switchRole('admin')}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm transition-all"
        >
          Switch to Facilities Admin (Marcus Vance)
        </button>
      </div>
    );
  }

  // Filtered reports
  const filteredReports = waterReports.filter((r) => {
    if (filterBuilding !== 'all' && r.building !== filterBuilding) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  const totalReports = waterReports.length;
  const pendingCount = waterReports.filter((r) => r.status === 'pending').length;
  const inProgressCount = waterReports.filter((r) => r.status === 'in_progress').length;
  const resolvedCount = waterReports.filter((r) => r.status === 'resolved').length;

  const handleOpenStatusModal = (report: WaterReport) => {
    setActiveReport(report);
    setNewStatus(report.status);
    setTechnician(report.assignedTechnician || 'Tech Carlos Mendoza (Plumbing Team B)');
    setResolutionNotes(report.resolutionNotes || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;

    updateWaterReportStatus(activeReport.id, newStatus, resolutionNotes, technician);
    setActiveReport(null);
  };

  const handleExportCSV = () => {
    const headers = 'TicketID,Building,Location,IssueType,Priority,Status,ReportedBy,Date,Notes\n';
    const rows = waterReports
      .map(
        (r) =>
          `"${r.id}","${r.building}","${r.location}","${r.issueType}","${r.priority}","${r.status}","${r.reporterName}","${r.createdAt}","${(r.resolutionNotes || '').replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartCampus360_Incidents_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Privacy & Regulatory Isolation Protocol Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-surface-container-high text-on-surface-variant text-xs border border-border-neutral/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
          <span className="font-bold uppercase tracking-wider text-[11px]">Operational Isolation Protocol</span>
          <span className="hidden md:inline text-outline">•</span>
          <span className="hidden md:inline">
            Student academic grades and study records are cryptographically air-gapped from this facilities dispatch system.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#138A72] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#138A72]"></span>
          <span>Dispatch Cluster Online</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              Facilities Operations Dispatch
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
              Read / Write Authorized
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            Admin Maintenance &amp; Impact Analytics
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Operational dispatch queue, ticket lifecycles, and building-level incident triage across campus.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-main-text text-xs font-semibold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">download</span>
            <span>Export Incident CSV</span>
          </button>
        </div>
      </div>

      {/* 5-Column Operational KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-border-neutral flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase">Total Logged Reports</span>
          <span className="text-2xl font-bold text-main-text my-1">{totalReports}</span>
          <span className="text-[10px] text-outline">Across 6 campus zones</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-border-neutral flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-red-700 uppercase">Pending Triage</span>
          <span className="text-2xl font-bold text-error my-1">{pendingCount}</span>
          <span className="text-[10px] text-red-600 font-medium">Requires initial inspection</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-border-neutral flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-blue-700 uppercase">In-Progress Dispatches</span>
          <span className="text-2xl font-bold text-primary my-1">{inProgressCount}</span>
          <span className="text-[10px] text-blue-600">Technicians assigned</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-border-neutral flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase">Resolved Incidents</span>
          <span className="text-2xl font-bold text-[#138A72] my-1">{resolvedCount}</span>
          <span className="text-[10px] text-emerald-700 font-medium">Verified repairs</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-border-neutral flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-outline uppercase">Average Turnaround</span>
          <span className="text-2xl font-bold text-main-text my-1">4.8h</span>
          <span className="text-[10px] text-[#138A72] font-semibold">-1.2h vs prior quarter</span>
        </div>
      </div>

      {/* Triage Queue Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-neutral overflow-hidden">
        {/* Filter controls */}
        <div className="p-4 border-b border-border-neutral bg-warm-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            <h2 className="font-headline-sm text-base font-bold text-main-text">
              Active Incident Dispatch Queue ({filteredReports.length})
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterBuilding}
              onChange={(e) => setFilterBuilding(e.target.value)}
              className="h-8 px-2 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-medium focus:outline-none"
            >
              <option value="all">All Buildings</option>
              <option value="Hostel Block A">Hostel Block A</option>
              <option value="Hostel Block B">Hostel Block B</option>
              <option value="Science Complex">Science Complex</option>
              <option value="Engineering Quad">Engineering Quad</option>
              <option value="Main Library Complex">Main Library</option>
              <option value="Cafeteria & Dining Hall">Cafeteria</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-8 px-2 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-medium focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Triage</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Table representation */}
        <div className="divide-y divide-border-neutral overflow-x-auto">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-4 hover:bg-surface-container-low/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-[600px]"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="font-mono text-xs font-bold text-main-text mt-0.5">#{report.id}</span>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-main-text">{report.building}</span>
                    <span className="text-xs text-secondary-text font-medium">• {report.location}</span>
                  </div>
                  <p className="text-xs text-main-text mt-1 line-clamp-1">{report.description}</p>
                  <div className="flex items-center gap-2 text-[11px] text-outline mt-1">
                    <span>Reported by: {report.reporterName}</span>
                    <span>•</span>
                    <span>{new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {report.assignedTechnician && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-semibold">{report.assignedTechnician}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                <StatusBadge type="waterPriority" value={report.priority} />
                <StatusBadge type="waterStatus" value={report.status} />

                <button
                  onClick={() => handleOpenStatusModal(report)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
                >
                  Triage / Update
                </button>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-secondary-text">
              <span className="material-symbols-outlined text-[36px] text-outline mb-1">done_all</span>
              <p className="text-xs font-semibold">No incidents found in this filter view.</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Updater Modal */}
      {activeReport && (
        <Modal
          isOpen={Boolean(activeReport)}
          onClose={() => setActiveReport(null)}
          title={`Triage Incident #${activeReport.id}`}
          subtitle={`${activeReport.building} • ${activeReport.location}`}
        >
          <form onSubmit={handleSaveStatus} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Workflow Status *</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-bold focus:outline-none"
              >
                <option value="pending">Pending Triage (Awaiting Technician Inspection)</option>
                <option value="in_progress">In Progress (Technician Dispatched / In Repair)</option>
                <option value="resolved">Resolved (Repairs Completed &amp; Leak Sealed)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Assigned Dispatch Team</label>
              <select
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              >
                <option value="Tech Carlos Mendoza (Plumbing Team B)">Tech Carlos Mendoza (Plumbing Team B)</option>
                <option value="Tech Vikram Rao (Facilities Mechanical)">Tech Vikram Rao (Facilities Mechanical)</option>
                <option value="Emergency Triage Team Alpha (High Pressure)">Emergency Triage Team Alpha (High Pressure)</option>
                <option value="External Municipal Contractor">External Municipal Contractor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">
                Resolution Notes &amp; Repair Work Log
              </label>
              <textarea
                rows={3}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="e.g. Replaced faulty washer seal, recalibrated pressure sensor, water flow restored to nominal..."
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
              <button
                type="button"
                onClick={() => setActiveReport(null)}
                className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm"
              >
                Commit Status Change
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
