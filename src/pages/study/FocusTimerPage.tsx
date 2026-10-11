import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const FocusTimerPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { tasks, focusSessions, saveFocusSession } = useData();

  // Timer states
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'short_break' | 'long_break'>('focus');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.id || '');

  const intervalRef = useRef<number | null>(null);

  // Play gentle web audio chime on completion
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio autoplay may be constrained
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            playChime();

            // Save completed focus session
            if (mode === 'focus') {
              const activeTask = tasks.find((t) => t.id === selectedTaskId);
              saveFocusSession({
                userId: currentUser.uid,
                taskId: activeTask?.id,
                taskTitle: activeTask?.title || 'Independent Focus Sprint',
                subject: activeTask?.subject || 'General Study',
                durationMinutes: selectedMinutes,
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, selectedMinutes, selectedTaskId, currentUser.uid, tasks, saveFocusSession]);

  const handleSetPreset = (minutes: number, newMode: 'focus' | 'short_break' | 'long_break') => {
    setIsRunning(false);
    setMode(newMode);
    setSelectedMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
  };

  const minutesDisplay = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secondsDisplay = String(timeLeft % 60).padStart(2, '0');

  const totalTimeSeconds = selectedMinutes * 60;
  const progressRatio = totalTimeSeconds > 0 ? (totalTimeSeconds - timeLeft) / totalTimeSeconds : 0;
  const strokeDashoffset = 100 - progressRatio * 100;

  const totalMinutesLoggedToday = focusSessions.reduce((acc, s) => acc + s.durationMinutes, 0);

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              Deep Cognitive Immersion
            </span>
            <span>•</span>
            <span className="font-label-sm text-[11px] text-[#2F6FED] font-semibold">Pomodoro Technique</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            Focus Timer &amp; Sprint Log
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Eliminate cognitive friction with disciplined timeboxing. Link active study tasks to track sprint output.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm border border-border-neutral">
          <span className="material-symbols-outlined text-[#138A72] text-[20px]">local_fire_department</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase font-semibold">Total Sprints Today</span>
            <span className="text-xs font-bold text-main-text">{totalMinutesLoggedToday} mins focused</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Timer Circular Dial (7 cols) + Session Log Table (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timer Workstation (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm border border-border-neutral flex flex-col items-center">
          {/* Mode Selector Chips */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-container-low border border-border-neutral mb-8">
            <button
              onClick={() => handleSetPreset(25, 'focus')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'focus' && selectedMinutes === 25
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              25m Focus
            </button>
            <button
              onClick={() => handleSetPreset(50, 'focus')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'focus' && selectedMinutes === 50
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              50m Deep Work
            </button>
            <button
              onClick={() => handleSetPreset(5, 'short_break')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'short_break'
                  ? 'bg-[#138A72] text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              5m Rest
            </button>
            <button
              onClick={() => handleSetPreset(15, 'long_break')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'long_break'
                  ? 'bg-[#138A72] text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              15m Break
            </button>
          </div>

          {/* Large Circular Dial */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Outer track */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#E4E9F0"
                strokeWidth="5"
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={mode === 'focus' ? '#2F6FED' : '#138A72'}
                strokeWidth="5"
                strokeDasharray="264"
                strokeDashoffset={264 * (1 - progressRatio)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-300"
              />
            </svg>

            {/* Inner Center Display */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-metric-val text-5xl sm:text-6xl font-extrabold text-main-text tracking-tight font-mono">
                {minutesDisplay}:{secondsDisplay}
              </span>
              <span className="font-label-sm text-xs font-semibold text-outline uppercase tracking-widest mt-1">
                {mode === 'focus' ? 'Active Immersion' : 'Recovery Window'}
              </span>
              {isRunning && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-primary font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span>Clock Running</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: Start/Pause & Reset */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-label-lg text-base font-bold shadow-md transition-all active:scale-[0.98] ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : mode === 'focus'
                  ? 'bg-primary hover:bg-primary-container text-white'
                  : 'bg-[#138A72] hover:bg-[#0F6F5C] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isRunning ? 'pause' : 'play_arrow'}
              </span>
              <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-secondary hover:text-main-text transition-colors"
              title="Reset Timer"
            >
              <span className="material-symbols-outlined text-[22px]">replay</span>
            </button>
          </div>

          {/* Link Task Selector */}
          <div className="w-full max-w-sm mt-8 pt-6 border-t border-border-neutral">
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-2 text-center">
              Link Current Sprint to Study Task:
            </label>
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-medium text-main-text focus:outline-none"
            >
              {tasks.map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.subject}] {t.title}
                </option>
              ))}
              <option value="">(No specific task — general study sprint)</option>
            </select>
          </div>
        </div>

        {/* Right Rail: Session History & Statistics (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">history</span>
              <h2 className="font-headline-sm text-base font-semibold text-main-text">Focus Sprint Logs</h2>
            </div>
            <span className="text-xs text-secondary font-medium">Recent Sessions</span>
          </div>

          <div className="space-y-3">
            {focusSessions.map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-lg bg-surface-container-low/70 border border-border-neutral/60 flex items-start justify-between gap-3 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-main-text truncate leading-tight">
                    {session.taskTitle || 'Study Session'}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-secondary-text mt-1">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container font-semibold text-main-text text-[10px]">
                      {session.subject || 'Academics'}
                    </span>
                    <span>•</span>
                    <span>{new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold shrink-0">
                  +{session.durationMinutes}m
                </span>
              </div>
            ))}

            {focusSessions.length === 0 && (
              <div className="text-center py-10 text-secondary-text">
                <span className="material-symbols-outlined text-[36px] text-outline mb-1">hourglass_empty</span>
                <p className="text-xs font-medium">No completed focus sprints logged yet today.</p>
                <p className="text-[11px] text-outline mt-0.5">Start your first 25m sprint above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
