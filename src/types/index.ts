export type UserRole = 'student' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  year?: string;
  dormitory?: string;
  joinedAt: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface StudyTask {
  id: string;
  userId: string;
  title: string;
  subject: string;
  topic: string;
  dueDate: string;
  estimatedMinutes: number;
  priority: TaskPriority;
  status: TaskStatus;
  completedAt?: string;
  createdAt: string;
  notes?: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

export interface SubjectCourse {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  color: string;
  topics: SyllabusTopic[];
  examDate?: string;
}

export type CalendarEventType = 'exam' | 'assignment' | 'lecture' | 'study_session' | 'lab';

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  date: string; // YYYY-MM-DD
  time?: string;
  subject?: string;
  location?: string;
  notes?: string;
}

export interface FocusSession {
  id: string;
  userId: string;
  taskId?: string;
  taskTitle?: string;
  subject?: string;
  durationMinutes: number;
  completedAt: string;
}

export type WaterIssueType =
  | 'leaking_tap'
  | 'pipe_burst'
  | 'low_pressure'
  | 'overflowing_tank'
  | 'washroom_hygiene'
  | 'water_contamination';

export type IssuePriority = 'low' | 'medium' | 'high' | 'emergency';
export type ReportStatus = 'pending' | 'in_progress' | 'resolved';

export interface WaterReport {
  id: string;
  reportedBy: string;
  reporterName: string;
  reporterEmail: string;
  reporterRole?: string;
  issueType: WaterIssueType;
  building: string;
  location: string;
  description: string;
  priority: IssuePriority;
  status: ReportStatus;
  photoUrl?: string;
  createdAt: string;
  assignedTechnician?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  estimatedGallonsSavedPerHour?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'academic' | 'sustainability' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AiPromptRequest {
  subject: string;
  topic: string;
  mode: 'explain' | 'quiz' | 'flashcards' | 'example';
  userQuestion?: string;
}

export interface AiStudyResponse {
  overview: string;
  keyConcepts: { title: string; explanation: string }[];
  codeOrFormula?: string;
  practicalExample?: string;
  flashcards?: { front: string; back: string }[];
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}
