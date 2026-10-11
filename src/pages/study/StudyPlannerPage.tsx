import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { StudyTask, TaskPriority, TaskStatus } from '../../types';

export const StudyPlannerPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { tasks, createTask, updateTask, deleteTask } = useData();
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<StudyTask | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('DAA');
  const [topic, setTopic] = useState('');
  const [dueDate, setDueDate] = useState('2024-10-21');
  const [estimatedMinutes, setEstimatedMinutes] = useState(45);
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [notes, setNotes] = useState('');

  // Filter logic
  const filteredTasks = tasks.filter((t) => {
    if (selectedSubject !== 'all' && t.subject !== selectedSubject) return false;
    if (selectedStatus !== 'all' && t.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && t.priority !== selectedPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.topic.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalCount = tasks.length;
  const velocity = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleOpenCreate = () => {
    setTitle('');
    setSubject('DAA');
    setTopic('');
    setDueDate('2024-10-21');
    setEstimatedMinutes(45);
    setPriority('medium');
    setNotes('');
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (task: StudyTask) => {
    setEditingTask(task);
    setTitle(task.title);
    setSubject(task.subject);
    setTopic(task.topic);
    setDueDate(task.dueDate);
    setEstimatedMinutes(task.estimatedMinutes);
    setPriority(task.priority);
    setNotes(task.notes || '');
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask({
      userId: currentUser.uid,
      title,
      subject,
      topic: topic || 'General Topic',
      dueDate,
      estimatedMinutes: Number(estimatedMinutes),
      priority,
      status: 'pending',
      notes,
    });
    setIsCreateOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !title.trim()) return;

    updateTask(editingTask.id, {
      title,
      subject,
      topic,
      dueDate,
      estimatedMinutes: Number(estimatedMinutes),
      priority,
      notes,
    });
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Page Title & Pacing Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              Cognitive Workstation
            </span>
            <span>•</span>
            <span className="font-label-sm text-[11px] text-[#2F6FED] font-semibold">Active Sprint Queue</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            Study Planner &amp; Task Velocity
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Organize coursework deliverables, schedule Pomodoro intervals, and accelerate syllabus completion.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/focus-timer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-main-text text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
            <span>Open Focus Clock</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-sm font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Create Task</span>
          </button>
        </div>
      </div>

      {/* Velocity Progress Bar Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-border-neutral flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm">
            {velocity}%
          </div>
          <div>
            <span className="font-label-lg text-sm font-semibold text-main-text block leading-tight">
              Term Sprint Velocity: {completedCount} of {totalCount} Tasks Done
            </span>
            <span className="text-xs text-secondary-text">
              {tasks.filter((t) => t.status === 'in_progress').length} currently active in progress
            </span>
          </div>
        </div>

        <div className="w-full md:w-64 bg-surface-container-low h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${velocity}%` }}
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-border-neutral flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by title, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-9 px-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs text-main-text font-medium focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="DAA">DAA</option>
            <option value="BioEng 204">BioEng 204</option>
            <option value="OS">OS</option>
            <option value="DBMS">DBMS</option>
            <option value="Computer Networks">Networks</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-9 px-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs text-main-text font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Queued</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="h-9 px-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs text-main-text font-medium focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {(selectedSubject !== 'all' ||
            selectedStatus !== 'all' ||
            selectedPriority !== 'all' ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedStatus('all');
                setSelectedPriority('all');
                setSearchQuery('');
              }}
              className="text-xs text-primary font-semibold hover:underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Task List / Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-neutral overflow-hidden">
        <div className="p-4 border-b border-border-neutral flex justify-between items-center bg-warm-surface/40">
          <h2 className="font-headline-sm text-base font-semibold text-main-text">
            Task Queue ({filteredTasks.length})
          </h2>
          <span className="text-xs text-secondary-text">Click task checkmark to toggle completion</span>
        </div>

        <div className="divide-y divide-border-neutral">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low/50 transition-colors ${
                task.status === 'completed' ? 'opacity-70 bg-gray-50/50' : ''
              }`}
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
                  className="w-5 h-5 mt-0.5 rounded text-primary focus:ring-primary border-gray-300 cursor-pointer"
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-label-lg text-sm font-semibold text-main-text ${
                      task.status === 'completed' ? 'line-through text-secondary-text' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-secondary-text">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-[11px]">
                      {task.subject}
                    </span>
                    <span>•</span>
                    <span className="text-main-text font-medium">{task.topic}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-outline">
                      <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                      Due {task.dueDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-outline">
                      <span className="material-symbols-outlined text-[13px]">timer</span>
                      {task.estimatedMinutes} mins
                    </span>
                  </div>
                  {task.notes && (
                    <p className="text-xs text-secondary-text/90 italic mt-1 line-clamp-1">{task.notes}</p>
                  )}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <StatusBadge type="priority" value={task.priority} />
                <StatusBadge type="status" value={task.status} />

                {/* Focus Timer Launcher */}
                <button
                  onClick={() => navigate('/focus-timer')}
                  title="Start Pomodoro Sprint for this task"
                  className="p-1.5 rounded-lg text-secondary hover:bg-surface-container-high hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEdit(task)}
                  title="Edit Task"
                  className="p-1.5 rounded-lg text-secondary hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    if (window.confirm(`Delete task "${task.title}"?`)) {
                      deleteTask(task.id);
                    }
                  }}
                  title="Delete Task"
                  className="p-1.5 rounded-lg text-error hover:bg-error-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-secondary-text">
              <span className="material-symbols-outlined text-[42px] text-outline mb-2">fact_check</span>
              <p className="text-sm font-medium">No tasks match your filter criteria.</p>
              <button
                onClick={handleOpenCreate}
                className="mt-3 text-xs text-primary font-semibold hover:underline"
              >
                + Create a new task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Study Task"
        subtitle="Deconstruct coursework into focused learning sprints"
      >
        <form onSubmit={handleSaveCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve Dynamic Programming Recurrence Tree"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Course Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
              <label className="block text-xs font-semibold text-main-text mb-1">Topic / Unit</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Master Theorem Case 2"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Duration (Mins)</label>
              <input
                type="number"
                min="10"
                max="300"
                step="5"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Optional Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key textbook pages, formula reminders, or submission link..."
              className="w-full p-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container shadow-sm"
            >
              Save Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Task Modal */}
      {editingTask && (
        <Modal
          isOpen={Boolean(editingTask)}
          onClose={() => setEditingTask(null)}
          title="Edit Study Task"
          subtitle={`Editing #${editingTask.id}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Task Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-main-text mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
                >
                  <option value="DAA">DAA</option>
                  <option value="BioEng 204">BioEng 204</option>
                  <option value="OS">OS</option>
                  <option value="DBMS">DBMS</option>
                  <option value="Computer Networks">Computer Networks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-main-text mb-1">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-main-text mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-main-text mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-main-text mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
