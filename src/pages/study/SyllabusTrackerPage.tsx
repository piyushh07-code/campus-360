import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';

export const SyllabusTrackerPage: React.FC = () => {
  const { courses, toggleTopic, addCourse, addTopic } = useData();

  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState<string>(courses[0]?.id || '');

  // Add Course Form
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [credits, setCredits] = useState(4);
  const [examDate, setExamDate] = useState('2024-11-15');

  // Add Topic Form
  const [newTopicTitle, setNewTopicTitle] = useState('');

  // Overall metrics
  const allTopics = courses.flatMap((c) => c.topics);
  const completedTopics = allTopics.filter((t) => t.completed).length;
  const totalTopics = allTopics.length;
  const masteryPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const filteredCourses =
    selectedSubjectFilter === 'all'
      ? courses
      : courses.filter((c) => c.code.toLowerCase().includes(selectedSubjectFilter.toLowerCase()));

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !courseCode.trim()) return;

    addCourse({
      code: courseCode,
      name: courseName,
      instructor: instructor || 'Faculty Instructor',
      credits: Number(credits),
      color: '#2F6FED',
      examDate,
      topics: [],
    });

    setCourseCode('');
    setCourseName('');
    setInstructor('');
    setIsAddCourseOpen(false);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !activeCourseId) return;

    addTopic(activeCourseId, newTopicTitle);
    setNewTopicTitle('');
    setIsAddTopicOpen(false);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Top Academic Context Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-border-neutral">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-2 text-outline mb-1 font-label-sm text-[11px] tracking-wider uppercase">
            <span className="material-symbols-outlined text-[15px] text-primary">school</span>
            <span>Academic Workstation • Fall Quarter 2024</span>
            <span className="inline-block w-1 h-1 rounded-full bg-outline"></span>
            <span className="text-[#138A72] font-semibold">Live Pacing Active</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text tracking-tight">
            Syllabus Mastery &amp; Course Tracker
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Deconstruct course syllabi into granular learning objectives, track topic pacing, and prepare for exams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Master Progress Dial Capsule */}
          <div className="flex items-center gap-2.5 bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm border border-border-neutral">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.5"
                />
                <path
                  className="text-primary stroke-current transition-all duration-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeDasharray={`${masteryPercentage}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute font-label-sm text-[10px] font-bold text-main-text">
                {masteryPercentage}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                Overall Term Mastery
              </span>
              <span className="font-label-md text-xs text-main-text font-semibold">
                {completedTopics} of {totalTopics} Topics Completed
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (courses.length > 0) setActiveCourseId(courses[0].id);
              setIsAddTopicOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-surface-container-lowest text-main-text font-label-lg text-sm rounded-lg hover:bg-surface-container border border-border-neutral transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">playlist_add</span>
            <span>+ Add Topic</span>
          </button>
          <button
            onClick={() => setIsAddCourseOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white font-label-lg text-sm font-semibold rounded-lg hover:bg-primary-container shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Subject</span>
          </button>
        </div>
      </section>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Term Pacing */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-border-neutral flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider">Term Syllabus Pacing</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
              +6% Ahead
            </span>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="font-metric-val text-2xl font-bold text-main-text">{masteryPercentage}%</span>
            <span className="text-xs text-secondary-text">pace aggregate</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-1">
            <div className="bg-primary h-full rounded-full" style={{ width: `${masteryPercentage}%` }} />
          </div>
          <span className="text-[11px] text-[#138A72] font-semibold mt-1">Target benchmark: 62%</span>
        </div>

        {/* KPI 2: Completed Units */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-border-neutral flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider">Completed Topics</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Verified
            </span>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="font-metric-val text-2xl font-bold text-main-text">{completedTopics}</span>
            <span className="text-xs text-secondary-text">/ {totalTopics} topics</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-1">
            <div className="bg-[#138A72] h-full rounded-full" style={{ width: `${masteryPercentage}%` }} />
          </div>
          <span className="text-[11px] text-secondary-text mt-1">{totalTopics - completedTopics} units remaining</span>
        </div>

        {/* KPI 3: Courses Enrolled */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-border-neutral flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider">Active Courses</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[10px] font-semibold">
              Fall 2024
            </span>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="font-metric-val text-2xl font-bold text-main-text">{courses.length}</span>
            <span className="text-xs text-secondary-text">rigorous courses</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-1">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '100%' }} />
          </div>
          <span className="text-[11px] text-secondary-text mt-1">15 credits workload</span>
        </div>

        {/* KPI 4: Exam Readiness */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-border-neutral flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider">Exam Readiness</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
              High Confidence
            </span>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="font-metric-val text-2xl font-bold text-main-text">84%</span>
            <span className="text-xs text-secondary-text">readiness index</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-1">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '84%' }} />
          </div>
          <span className="text-[11px] text-[#138A72] font-semibold mt-1">Optimal preparation</span>
        </div>
      </div>

      {/* Course Syllabi Panels */}
      <div className="space-y-6">
        {filteredCourses.map((course) => {
          const courseCompleted = course.topics.filter((t) => t.completed).length;
          const courseTotal = course.topics.length;
          const coursePercent = courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0;

          return (
            <div
              key={course.id}
              className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-neutral overflow-hidden"
            >
              {/* Course Header Banner */}
              <div className="p-5 border-b border-border-neutral bg-warm-surface/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm shrink-0"
                    style={{ backgroundColor: course.color || '#2F6FED' }}
                  >
                    {course.code.split('-')[0]}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-main-text font-bold text-xs">
                        {course.code}
                      </span>
                      <h2 className="font-headline-sm text-base sm:text-lg font-bold text-main-text truncate">
                        {course.name}
                      </h2>
                    </div>
                    <span className="text-xs text-secondary-text mt-1">
                      Instructor: {course.instructor} • {course.credits} Credits{' '}
                      {course.examDate && `• Exam Date: ${course.examDate}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-main-text">
                      {courseCompleted} of {courseTotal} Mastered
                    </span>
                    <span className="text-[11px] text-secondary-text">{coursePercent}% Complete</span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveCourseId(course.id);
                      setIsAddTopicOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
                  >
                    + Add Topic
                  </button>
                </div>
              </div>

              {/* Course Topics Checklist */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.topics.map((topic) => (
                  <label
                    key={topic.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      topic.completed
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-surface-container-low/50 border-border-neutral hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={topic.completed}
                      onChange={() => toggleTopic(course.id, topic.id)}
                      className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary border-gray-300 cursor-pointer"
                    />
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-xs font-medium ${
                          topic.completed ? 'line-through text-secondary-text' : 'text-main-text font-semibold'
                        }`}
                      >
                        {topic.title}
                      </span>
                      <span className="text-[10px] text-outline mt-0.5">
                        {topic.completed ? 'Mastered in curriculum' : 'Pending review / lecture notes'}
                      </span>
                    </div>
                  </label>
                ))}

                {course.topics.length === 0 && (
                  <div className="col-span-2 text-center py-6 text-secondary-text text-xs">
                    No topics added to this course syllabus yet.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title="Add Subject Course"
        subtitle="Register a new academic course to track syllabus progress"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Course Code *</label>
              <input
                type="text"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CS-310"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Course Full Name *</label>
            <input
              type="text"
              required
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. Distributed Cloud Computing"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Instructor</label>
              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="e.g. Dr. Alan Turing"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Final Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
            <button
              type="button"
              onClick={() => setIsAddCourseOpen(false)}
              className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container shadow-sm"
            >
              Add Course
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Topic Modal */}
      <Modal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        title="Add Syllabus Topic"
        subtitle="Append a topic to track toward syllabus completion"
      >
        <form onSubmit={handleCreateTopic} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Select Course</label>
            <select
              value={activeCourseId}
              onChange={(e) => setActiveCourseId(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-main-text mb-1">Topic Title *</label>
            <input
              type="text"
              required
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="e.g. Byzantine Fault Tolerance & Paxos Consensus"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-sm focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-neutral">
            <button
              type="button"
              onClick={() => setIsAddTopicOpen(false)}
              className="px-4 py-2 rounded-lg text-secondary-text hover:bg-surface-container text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container shadow-sm"
            >
              Add Topic
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
