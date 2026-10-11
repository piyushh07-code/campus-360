import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { TaskPriority } from '../../types';

export const StudentDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { tasks, updateTask, createTask, waterReports } = useData();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('DAA');
  const [newTopic, setNewTopic] = useState('');
  const [newDueDate, setNewDueDate] = useState('2024-10-20');
  const [newDuration, setNewDuration] = useState(45);
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');

  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const urgentCount = pendingTasks.filter((t) => t.priority === 'urgent' || t.priority === 'high').length;

  const activeReportsCount = waterReports.filter((r) => r.status !== 'resolved').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createTask({
      userId: currentUser.uid,
      title: newTitle,
      subject: newSubject,
      topic: newTopic || 'General Review',
      dueDate: newDueDate,
      estimatedMinutes: Number(newDuration),
      priority: newPriority,
      status: 'pending',
    });

    setNewTitle('');
    setNewTopic('');
    setIsTaskModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Top Greeting & Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-border-neutral">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold">
              Scholar Intelligence &amp; Eco-Monitor
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#138A72]"></span>
            <span className="font-label-sm text-[11px] text-outline">Realtime Stream Active</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Fall Quarter Week 4 •{' '}
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-label-sm bg-surface-container-high text-on-secondary-container">
              Verified Academic Cohort
            </span>
          </p>
        </div>

        {/* Quick Action Launchers */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#2F6FED] hover:bg-[#2056C2] text-white font-label-lg text-sm font-semibold shadow-sm transition-all active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Study Task</span>
          </button>
          <Link
            to="/report-water-issue"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#07866E] hover:bg-[#056E5A] text-white font-label-lg text-sm font-semibold shadow-sm transition-all active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">water_drop</span>
            <span>Report Water Issue</span>
          </Link>
        </div>
      </div>

      {/* 4-Column Key Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Tasks Velocity */}
        <MetricCard
          label="Today's Tasks"
          value={pendingTasks.length}
          unit="tasks active"
          badgeText={`${completedTasks.length} of ${totalTasks} Done`}
          badgeType="secondary"
          progress={completionPercentage}
          progressColor="bg-[#2F6FED]"
          footerLeft={`${completionPercentage}% Daily Velocity`}
          footerRight={`${urgentCount} High Priority`}
        />

        {/* Metric 2: Exam Deadlines */}
        <MetricCard
          label="Exam & Lab Timeline"
          value="3"
          unit="deadlines this week"
          badgeText="T-48h Imminent"
          badgeType="error"
          footerLeft="BioEng 204 Midterm"
          footerHighlight="In 2 days"
        />

        {/* Metric 3: Weekly Study Hours */}
        <MetricCard
          label="Weekly Pacing"
          value="18.5"
          unit="/ 21.0 hrs logged"
          badgeText="+4% Ahead"
          badgeType="tertiary"
          progress={88}
          progressColor="bg-[#138A72]"
          footerLeft="88% of Weekly Target"
          footerHighlight="Optimal"
        />

        {/* Metric 4: WaterWatch Telemetry Pulse */}
        <MetricCard
          label="Campus WaterWatch"
          value={activeReportsCount}
          unit="active reports"
          badgeText="Live Hub"
          badgeType="tertiary"
          progress={92}
          progressColor="bg-[#07866E]"
          footerLeft="Dorm Block A Status"
          footerHighlight="-18% gal"
        />
      </div>

      {/* Main Dual-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Active Tasks & Study Sprints */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
              <h2 className="font-headline-sm text-lg font-semibold text-main-text">Active Study Sprint Queue</h2>
            </div>
            <Link
              to="/study-planner"
              className="font-label-sm text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
            >
              <span>View All ({tasks.length})</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-3 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low border border-border-neutral/60 transition-colors gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() =>
                      updateTask(task.id, {
                        status: task.status === 'completed' ? 'pending' : 'completed',
                      })
                    }
                    className="w-4 h-4 mt-1 rounded text-primary focus:ring-primary border-gray-300 cursor-pointer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`font-label-md text-sm font-semibold text-main-text truncate ${
                        task.status === 'completed' ? 'line-through text-secondary-text' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-secondary-text">
                      <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                        {task.subject}
                      </span>
                      <span>•</span>
                      <span className="truncate">{task.topic}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-outline">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {task.estimatedMinutes}m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge type="priority" value={task.priority} />
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-center py-8 text-secondary-text">
                <span className="material-symbols-outlined text-[36px] text-outline mb-2">task_alt</span>
                <p className="text-sm">No tasks currently queued. Create your first study sprint!</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border-neutral flex justify-between items-center">
            <span className="text-xs text-secondary-text">
              Showing 5 of {tasks.length} tasks • Linked with Academic Pacing
            </span>
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              <span>Quick Add Task</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Imminent Milestones & Conservation Pulse */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Imminent Academic Deliverables */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-neutral">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[20px]">event_upcoming</span>
                <h2 className="font-headline-sm text-base font-semibold text-main-text">Impending Deliverables</h2>
              </div>
              <Link to="/calendar" className="text-xs text-primary font-semibold hover:underline">
                Calendar
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-50/70 border border-red-200 flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-red-900">BioEng 204 Midterm Exam</span>
                  <span className="text-xs text-red-700 mt-0.5">Science Complex Hall B • 10:00 AM</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-red-200 text-red-800 text-[10px] font-bold">
                  In 2 days
                </span>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low border border-border-neutral flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-main-text">DAA Problem Set 4 Submission</span>
                  <span className="text-xs text-secondary-text mt-0.5">Course Portal Upload • 11:59 PM</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[10px] font-medium">
                  In 3 days
                </span>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low border border-border-neutral flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-main-text">OS Virtual Memory Lab Session</span>
                  <span className="text-xs text-secondary-text mt-0.5">Engineering Quad Lab 3B • 02:00 PM</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[10px] font-medium">
                  In 5 days
                </span>
              </div>
            </div>
          </div>

          {/* WaterWatch Campus Conservation Mini Widget */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#138A72]"></div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-neutral">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#138A72] text-[20px]">water_drop</span>
                <h2 className="font-headline-sm text-base font-semibold text-main-text">Dorm Conservation Hub</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                Tier A+
              </span>
            </div>

            <p className="text-xs text-secondary-text leading-relaxed mb-4">
              Hostel Block A has conserved an estimated <strong className="text-main-text">18.5 gal/hr</strong> this
              quarter through prompt leak reporting and repair dispatches.
            </p>

            <div className="p-3 rounded-lg bg-[#E6F5F1] border border-[#138A72]/20 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#138A72] block">Recent Report in Your Dorm</span>
                <span className="text-[11px] text-[#202B3C]">3rd Floor South Washroom Sink Leaking</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#138A72] font-semibold shadow-xs">
                In Progress
              </span>
            </div>

            <Link
              to="/waterwatch"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-main-text font-semibold text-xs transition-colors"
            >
              <span>Explore WaterWatch Campus Telemetry</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create Study Task"
        subtitle="Set objective, subject, deadline, and priority"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Master Dynamic Programming 0/1 Knapsack"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Subject</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              >
                <option value="DAA">DAA (Algorithms)</option>
                <option value="BioEng 204">BioEng 204 (Transport)</option>
                <option value="OS">OS (Operating Systems)</option>
                <option value="DBMS">DBMS (Databases)</option>
                <option value="Computer Networks">Computer Networks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Topic / Chapter</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="e.g. Recurrence Relations"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Due Date</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Estimated Minutes</label>
              <input
                type="number"
                min="10"
                max="300"
                step="5"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(false)}
              className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container shadow-sm"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
