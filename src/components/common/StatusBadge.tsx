import React from 'react';
import { TaskPriority, TaskStatus, ReportStatus, IssuePriority } from '../../types';

interface BadgeProps {
  type?: 'priority' | 'status' | 'waterStatus' | 'waterPriority' | 'tag';
  value: string;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ type = 'tag', value, className = '' }) => {
  // Task Priority
  if (type === 'priority') {
    const p = value as TaskPriority;
    const styles: Record<TaskPriority, string> = {
      low: 'bg-surface-container text-outline',
      medium: 'bg-secondary-fixed text-on-secondary-fixed',
      high: 'bg-amber-100 text-amber-800 border border-amber-200',
      urgent: 'bg-error-container text-on-error-container border border-error/20 font-semibold',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase ${styles[p] || 'bg-surface-container'} ${className}`}>
        {p}
      </span>
    );
  }

  // Task Status
  if (type === 'status') {
    const s = value as TaskStatus;
    const labels: Record<TaskStatus, { text: string; cls: string }> = {
      pending: { text: 'Queued', cls: 'bg-surface-container-high text-on-surface-variant' },
      in_progress: { text: 'In Progress', cls: 'bg-primary-fixed text-on-primary-fixed font-semibold' },
      completed: { text: 'Completed', cls: 'bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold' },
    };
    const current = labels[s] || { text: s, cls: 'bg-surface-container' };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${current.cls} ${className}`}>
        {current.text}
      </span>
    );
  }

  // Water Report Status
  if (type === 'waterStatus') {
    const s = value as ReportStatus;
    const labels: Record<ReportStatus, { text: string; cls: string; dot: string }> = {
      pending: { text: 'Pending Triage', cls: 'bg-amber-50 text-amber-800 border border-amber-200', dot: 'bg-amber-500' },
      in_progress: { text: 'Technician Dispatched', cls: 'bg-blue-50 text-blue-800 border border-blue-200 font-semibold', dot: 'bg-blue-500' },
      resolved: { text: 'Resolved', cls: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold', dot: 'bg-emerald-500' },
    };
    const current = labels[s] || { text: s, cls: 'bg-surface-container', dot: 'bg-gray-400' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${current.cls} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`}></span>
        <span>{current.text}</span>
      </span>
    );
  }

  // Water Priority
  if (type === 'waterPriority') {
    const p = value as IssuePriority;
    const styles: Record<IssuePriority, string> = {
      low: 'bg-surface-container text-outline',
      medium: 'bg-secondary-fixed text-on-secondary-fixed',
      high: 'bg-orange-100 text-orange-800 border border-orange-300 font-semibold',
      emergency: 'bg-red-100 text-red-800 border border-red-300 font-bold animate-pulse',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider ${styles[p] || 'bg-surface-container'} ${className}`}>
        {p}
      </span>
    );
  }

  // Generic tag fallback
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] bg-surface-container-high text-on-surface-variant ${className}`}>
      {value}
    </span>
  );
};
