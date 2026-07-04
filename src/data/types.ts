export type TaskCategory = 'normal' | 'backlog';
export type TaskStatus = 'open' | 'done';

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  journal: string;
  status: TaskStatus;
  category: TaskCategory;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  subtasks: Subtask[];
}

export interface DailyPlan {
  date: string;
  taskIds: string[];
  subtaskIds: string[];
}

export interface WeeklyPlan {
  weekStart: string;
  taskIds: string[];
  subtaskIds: string[];
}

export interface Settings {
  lastActiveDate: string | null;
  lastWeekStart: string | null;
}
