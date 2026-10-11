import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudyTask,
  SubjectCourse,
  CalendarEvent,
  FocusSession,
  WaterReport,
  NotificationItem,
  ReportStatus,
} from '../types';
import { DataAdapter } from '../services/storage/dataAdapter';

interface DataContextType {
  tasks: StudyTask[];
  createTask: (task: Omit<StudyTask, 'id' | 'createdAt'>) => StudyTask;
  updateTask: (id: string, updates: Partial<StudyTask>) => void;
  deleteTask: (id: string) => void;

  courses: SubjectCourse[];
  toggleTopic: (courseId: string, topicId: string) => void;
  addCourse: (course: Omit<SubjectCourse, 'id'>) => SubjectCourse;
  addTopic: (courseId: string, topicTitle: string) => void;

  calendarEvents: CalendarEvent[];
  createCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
  deleteCalendarEvent: (id: string) => void;

  focusSessions: FocusSession[];
  saveFocusSession: (session: Omit<FocusSession, 'id' | 'completedAt'>) => FocusSession;

  waterReports: WaterReport[];
  createWaterReport: (report: Omit<WaterReport, 'id' | 'createdAt' | 'status'>) => WaterReport;
  updateWaterReportStatus: (id: string, status: ReportStatus, notes?: string, tech?: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  resetDemoData: () => void;
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<StudyTask[]>(() => DataAdapter.getTasks());
  const [courses, setCourses] = useState<SubjectCourse[]>(() => DataAdapter.getCourses());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() =>
    DataAdapter.getCalendarEvents()
  );
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(() =>
    DataAdapter.getFocusSessions()
  );
  const [waterReports, setWaterReports] = useState<WaterReport[]>(() =>
    DataAdapter.getWaterReports()
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    DataAdapter.getNotifications()
  );

  // Refresh helper
  const reloadAll = () => {
    setTasks(DataAdapter.getTasks());
    setCourses(DataAdapter.getCourses());
    setCalendarEvents(DataAdapter.getCalendarEvents());
    setFocusSessions(DataAdapter.getFocusSessions());
    setWaterReports(DataAdapter.getWaterReports());
    setNotifications(DataAdapter.getNotifications());
  };

  // --- Task Operations ---
  const createTask = (taskData: Omit<StudyTask, 'id' | 'createdAt'>) => {
    const created = DataAdapter.createTask(taskData);
    setTasks(DataAdapter.getTasks());
    return created;
  };

  const updateTask = (id: string, updates: Partial<StudyTask>) => {
    DataAdapter.updateTask(id, updates);
    setTasks(DataAdapter.getTasks());
  };

  const deleteTask = (id: string) => {
    DataAdapter.deleteTask(id);
    setTasks(DataAdapter.getTasks());
  };

  // --- Course / Topic Operations ---
  const toggleTopic = (courseId: string, topicId: string) => {
    DataAdapter.toggleTopic(courseId, topicId);
    setCourses(DataAdapter.getCourses());
  };

  const addCourse = (courseData: Omit<SubjectCourse, 'id'>) => {
    const created = DataAdapter.addCourse(courseData);
    setCourses(DataAdapter.getCourses());
    return created;
  };

  const addTopic = (courseId: string, topicTitle: string) => {
    DataAdapter.addTopicToCourse(courseId, topicTitle);
    setCourses(DataAdapter.getCourses());
  };

  // --- Calendar Operations ---
  const createCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const created = DataAdapter.createCalendarEvent(eventData);
    setCalendarEvents(DataAdapter.getCalendarEvents());
    return created;
  };

  const deleteCalendarEvent = (id: string) => {
    DataAdapter.deleteCalendarEvent(id);
    setCalendarEvents(DataAdapter.getCalendarEvents());
  };

  // --- Focus Operations ---
  const saveFocusSession = (sessionData: Omit<FocusSession, 'id' | 'completedAt'>) => {
    const created = DataAdapter.saveFocusSession(sessionData);
    setFocusSessions(DataAdapter.getFocusSessions());
    return created;
  };

  // --- Water Reports Operations ---
  const createWaterReport = (reportData: Omit<WaterReport, 'id' | 'createdAt' | 'status'>) => {
    const created = DataAdapter.createWaterReport(reportData);
    setWaterReports(DataAdapter.getWaterReports());
    setNotifications(DataAdapter.getNotifications());
    return created;
  };

  const updateWaterReportStatus = (
    id: string,
    status: ReportStatus,
    notes?: string,
    tech?: string
  ) => {
    DataAdapter.updateWaterReportStatus(id, status, notes, tech);
    setWaterReports(DataAdapter.getWaterReports());
    setNotifications(DataAdapter.getNotifications());
  };

  // --- Notifications ---
  const markNotificationRead = (id: string) => {
    DataAdapter.markNotificationRead(id);
    setNotifications(DataAdapter.getNotifications());
  };

  const markAllNotificationsRead = () => {
    DataAdapter.markAllNotificationsRead();
    setNotifications(DataAdapter.getNotifications());
  };

  const resetDemoData = () => {
    DataAdapter.resetToDemoData();
    reloadAll();
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        courses,
        toggleTopic,
        addCourse,
        addTopic,
        calendarEvents,
        createCalendarEvent,
        deleteCalendarEvent,
        focusSessions,
        saveFocusSession,
        waterReports,
        createWaterReport,
        updateWaterReportStatus,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        resetAllData: resetDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
