import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';
import { CalendarEvent, CalendarEventType } from '../../types';

export const AcademicCalendarPage: React.FC = () => {
  const { calendarEvents, createCalendarEvent, deleteCalendarEvent } = useData();

  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // October 2024
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEventType>('exam');
  const [date, setDate] = useState('2024-10-25');
  const [time, setTime] = useState('10:00 AM - 12:00 PM');
  const [subject, setSubject] = useState('DAA');
  const [location, setLocation] = useState('Science Complex Hall B');
  const [notes, setNotes] = useState('');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const filteredEvents = calendarEvents.filter((e) => {
    if (selectedType !== 'all' && e.type !== selectedType) return false;
    return true;
  });

  const getEventsForDay = (day: number) => {
    const formatted = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
    return filteredEvents.filter((e) => e.date === formatted);
  };

  const typeStyles: Record<CalendarEventType, { bg: string; text: string; dot: string; label: string }> = {
    exam: { bg: 'bg-red-50 border-red-200', text: 'text-red-800', dot: 'bg-red-500', label: 'Exam' },
    assignment: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', dot: 'bg-blue-500', label: 'Assignment' },
    lab: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500', label: 'Lab' },
    study_session: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-800', dot: 'bg-purple-500', label: 'Study Session' },
    lecture: { bg: 'bg-gray-100 border-gray-200', text: 'text-gray-800', dot: 'bg-gray-500', label: 'Lecture' },
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createCalendarEvent({
      title,
      type,
      date,
      time,
      subject,
      location,
      notes,
    });
    setIsAddOpen(false);
    setTitle('');
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              Academic Timetable &amp; Milestones
            </span>
            <span>•</span>
            <span className="font-label-sm text-[11px] text-[#2F6FED] font-semibold">Fall Quarter 2024</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            Academic Calendar
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Coordinate midterm exam dates, laboratory workshops, and focused group study sprints.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-medium focus:outline-none"
          >
            <option value="all">All Events</option>
            <option value="exam">Exams</option>
            <option value="assignment">Assignments</option>
            <option value="lab">Labs</option>
            <option value="study_session">Study Sprints</option>
          </select>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-sm font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Event</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar Month Grid (8 cols) + Upcoming Timeline Rail (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Month View (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
          {/* Month Navigation Controls */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-neutral">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">calendar_month</span>
              <h2 className="font-headline-md text-xl font-bold text-main-text">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg hover:bg-surface-container text-secondary transition-colors"
                title="Previous Month"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                onClick={() => setCurrentDate(new Date(2024, 9, 1))}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg hover:bg-surface-container text-secondary transition-colors"
                title="Next Month"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-xs font-semibold text-outline pb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1">
            {/* Blank leading days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[85px] p-1.5 rounded-lg bg-surface-container-low/20" />
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = day === 16 && currentDate.getMonth() === 9 && currentDate.getFullYear() === 2024;

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-[85px] p-1.5 rounded-lg border transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-blue-50/50 border-primary shadow-xs ring-1 ring-primary/30'
                      : 'bg-white border-border-neutral/60 hover:border-primary/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                        isToday ? 'bg-primary text-white' : 'text-main-text'
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    )}
                  </div>

                  {/* Day Events Snippet */}
                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((evt) => {
                      const style = typeStyles[evt.type] || typeStyles.lecture;
                      return (
                        <div
                          key={evt.id}
                          className={`px-1 py-0.5 rounded text-[10px] font-medium truncate border ${style.bg}`}
                          title={`${evt.title} (${evt.time || ''})`}
                        >
                          {evt.title}
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-primary font-semibold block text-right">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Rail: Upcoming Timeline (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
            <h2 className="font-headline-sm text-base font-semibold text-main-text">
              Upcoming Milestones ({filteredEvents.length})
            </h2>
            <span className="text-xs text-secondary font-medium">Timeline</span>
          </div>

          <div className="space-y-3">
            {filteredEvents.map((evt) => {
              const style = typeStyles[evt.type] || typeStyles.lecture;
              return (
                <div
                  key={evt.id}
                  className="p-3 rounded-lg bg-surface-container-low/70 border border-border-neutral/60 flex flex-col gap-1.5 hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.bg}`}>
                      {style.label}
                    </span>
                    <button
                      onClick={() => deleteCalendarEvent(evt.id)}
                      className="text-gray-400 hover:text-error text-xs"
                      title="Remove event"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <span className="text-xs font-bold text-main-text leading-tight">{evt.title}</span>

                  <div className="flex items-center gap-2 text-[11px] text-secondary-text flex-wrap">
                    <span className="flex items-center gap-1 font-semibold text-main-text">
                      <span className="material-symbols-outlined text-[13px] text-primary">calendar_today</span>
                      {evt.date}
                    </span>
                    {evt.time && <span>• {evt.time}</span>}
                  </div>

                  {evt.location && (
                    <span className="text-[11px] text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      {evt.location}
                    </span>
                  )}
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="text-center py-8 text-secondary-text">
                <span className="material-symbols-outlined text-[32px] text-outline mb-1">event_busy</span>
                <p className="text-xs">No upcoming events found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Schedule Academic Event"
        subtitle="Add an exam date, homework deadline, or group study session"
      >
        <form onSubmit={handleSaveEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Operating Systems Final Exam"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Event Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as CalendarEventType)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              >
                <option value="exam">Exam</option>
                <option value="assignment">Assignment / Project</option>
                <option value="lab">Lab Workshop</option>
                <option value="study_session">Study Session</option>
                <option value="lecture">Special Lecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Time Range</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 10:00 AM - 12:00 PM"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Location / Venue</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Science Complex Hall B"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Notes / Instructions</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allowed materials, formula sheets, or teammates..."
              className="w-full p-2.5 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container shadow-sm"
            >
              Save Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
