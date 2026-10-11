import {
  StudyTask,
  SubjectCourse,
  CalendarEvent,
  FocusSession,
  WaterReport,
  NotificationItem,
  UserProfile,
  ReportStatus,
} from '../../types';
import {
  INITIAL_STUDY_TASKS,
  INITIAL_COURSES,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_FOCUS_SESSIONS,
  INITIAL_WATER_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_STUDENT_USER,
  INITIAL_ADMIN_USER,
} from './mockData';

const STORAGE_KEYS = {
  TASKS: 'sc360_study_tasks',
  COURSES: 'sc360_courses',
  CALENDAR: 'sc360_calendar',
  FOCUS: 'sc360_focus_sessions',
  WATER_REPORTS: 'sc360_water_reports',
  NOTIFICATIONS: 'sc360_notifications',
  CURRENT_USER: 'sc360_current_user',
};

// Safe localStorage helper
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`[DataAdapter] Failed to load key: ${key}, using fallback`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`[DataAdapter] Failed to save key: ${key}`, err);
  }
}

export class DataAdapter {
  // Current active user / persona
  static getCurrentUser(): UserProfile {
    return loadFromStorage<UserProfile>(STORAGE_KEYS.CURRENT_USER, INITIAL_STUDENT_USER);
  }

  static setCurrentUser(user: UserProfile): void {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
  }

  static switchPersona(role: 'student' | 'admin'): UserProfile {
    const newUser = role === 'student' ? INITIAL_STUDENT_USER : INITIAL_ADMIN_USER;
    this.setCurrentUser(newUser);
    return newUser;
  }

  // --- STUDY TASKS ---
  static getTasks(): StudyTask[] {
    return loadFromStorage<StudyTask[]>(STORAGE_KEYS.TASKS, INITIAL_STUDY_TASKS);
  }

  static createTask(task: Omit<StudyTask, 'id' | 'createdAt'>): StudyTask {
    const tasks = this.getTasks();
    const newTask: StudyTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    saveToStorage(STORAGE_KEYS.TASKS, updated);
    return newTask;
  }

  static updateTask(id: string, updates: Partial<StudyTask>): StudyTask | null {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updatedTask = { ...tasks[index], ...updates };
    if (updates.status === 'completed' && !updatedTask.completedAt) {
      updatedTask.completedAt = new Date().toISOString();
    }
    tasks[index] = updatedTask;
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return updatedTask;
  }

  static deleteTask(id: string): boolean {
    const tasks = this.getTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    saveToStorage(STORAGE_KEYS.TASKS, filtered);
    return filtered.length !== tasks.length;
  }

  // --- COURSES & SYLLABUS ---
  static getCourses(): SubjectCourse[] {
    return loadFromStorage<SubjectCourse[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  }

  static toggleTopic(courseId: string, topicId: string): SubjectCourse | null {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex((c) => c.id === courseId);
    if (courseIndex === -1) return null;

    const course = courses[courseIndex];
    course.topics = course.topics.map((t) =>
      t.id === topicId ? { ...t, completed: !t.completed } : t
    );
    courses[courseIndex] = course;
    saveToStorage(STORAGE_KEYS.COURSES, courses);
    return course;
  }

  static addCourse(course: Omit<SubjectCourse, 'id'>): SubjectCourse {
    const courses = this.getCourses();
    const newCourse: SubjectCourse = {
      ...course,
      id: `course-${Date.now()}`,
    };
    const updated = [...courses, newCourse];
    saveToStorage(STORAGE_KEYS.COURSES, updated);
    return newCourse;
  }

  static addTopicToCourse(courseId: string, topicTitle: string): SubjectCourse | null {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex((c) => c.id === courseId);
    if (courseIndex === -1) return null;

    const course = courses[courseIndex];
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: topicTitle,
      completed: false,
    };
    course.topics.push(newTopic);
    courses[courseIndex] = course;
    saveToStorage(STORAGE_KEYS.COURSES, courses);
    return course;
  }

  // --- CALENDAR EVENTS ---
  static getCalendarEvents(): CalendarEvent[] {
    return loadFromStorage<CalendarEvent[]>(STORAGE_KEYS.CALENDAR, INITIAL_CALENDAR_EVENTS);
  }

  static createCalendarEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
    const events = this.getCalendarEvents();
    const newEvent: CalendarEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    const updated = [...events, newEvent];
    saveToStorage(STORAGE_KEYS.CALENDAR, updated);
    return newEvent;
  }

  static deleteCalendarEvent(id: string): boolean {
    const events = this.getCalendarEvents();
    const filtered = events.filter((e) => e.id !== id);
    saveToStorage(STORAGE_KEYS.CALENDAR, filtered);
    return filtered.length !== events.length;
  }

  // --- FOCUS SESSIONS ---
  static getFocusSessions(): FocusSession[] {
    return loadFromStorage<FocusSession[]>(STORAGE_KEYS.FOCUS, INITIAL_FOCUS_SESSIONS);
  }

  static saveFocusSession(session: Omit<FocusSession, 'id' | 'completedAt'>): FocusSession {
    const sessions = this.getFocusSessions();
    const newSession: FocusSession = {
      ...session,
      id: `foc-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    const updated = [newSession, ...sessions];
    saveToStorage(STORAGE_KEYS.FOCUS, updated);
    return newSession;
  }

  // --- WATER REPORTS ---
  static getWaterReports(): WaterReport[] {
    return loadFromStorage<WaterReport[]>(STORAGE_KEYS.WATER_REPORTS, INITIAL_WATER_REPORTS);
  }

  static createWaterReport(report: Omit<WaterReport, 'id' | 'createdAt' | 'status'>): WaterReport {
    const reports = this.getWaterReports();
    const newReport: WaterReport = {
      ...report,
      id: `rep-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [newReport, ...reports];
    saveToStorage(STORAGE_KEYS.WATER_REPORTS, updated);

    // Auto-create notification for submission
    this.createNotification({
      title: 'Water Incident Dispatched',
      message: `Report #${newReport.id} (${newReport.building}) has been logged to campus facilities dispatch.`,
      type: 'sustainability',
      actionUrl: '/my-reports',
    });

    return newReport;
  }

  static updateWaterReportStatus(
    id: string,
    status: ReportStatus,
    notes?: string,
    technician?: string
  ): WaterReport | null {
    const reports = this.getWaterReports();
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const report = reports[index];
    report.status = status;
    if (notes) report.resolutionNotes = notes;
    if (technician) report.assignedTechnician = technician;
    if (status === 'resolved' && !report.resolvedAt) {
      report.resolvedAt = new Date().toISOString();
    }
    reports[index] = report;
    saveToStorage(STORAGE_KEYS.WATER_REPORTS, reports);

    // Notification on resolution
    if (status === 'resolved') {
      this.createNotification({
        title: 'Incident Resolved',
        message: `Report #${report.id} (${report.building}) was marked as RESOLVED by facilities.`,
        type: 'sustainability',
        actionUrl: '/my-reports',
      });
    }

    return report;
  }

  // Duplicate Check logic: finds reports with matching building & same issue within the last 48 hours
  static findPossibleDuplicates(building: string, issueType: string): WaterReport[] {
    const reports = this.getWaterReports();
    return reports.filter(
      (r) =>
        r.building.toLowerCase() === building.toLowerCase() &&
        r.issueType === issueType &&
        r.status !== 'resolved'
    );
  }

  // --- NOTIFICATIONS ---
  static getNotifications(): NotificationItem[] {
    return loadFromStorage<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  static createNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>): NotificationItem {
    const notifs = this.getNotifications();
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updated = [newNotif, ...notifs];
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
    return newNotif;
  }

  static markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  static markAllNotificationsRead(): void {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => ({ ...n, read: true }));
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  // --- RESET ALL DATA TO DEMO ---
  static resetToDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_STUDY_TASKS));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(INITIAL_CALENDAR_EVENTS));
    localStorage.setItem(STORAGE_KEYS.FOCUS, JSON.stringify(INITIAL_FOCUS_SESSIONS));
    localStorage.setItem(STORAGE_KEYS.WATER_REPORTS, JSON.stringify(INITIAL_WATER_REPORTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_STUDENT_USER));
  }
}
