import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { DailyPlan, Settings, Task, TaskCategory, WeeklyPlan } from './types';

interface WorkflowState {
  tasks: Task[];
  dailyPlans: DailyPlan[];
  weeklyPlans: WeeklyPlan[];
  settings: Settings;
  addTask: (title: string, category?: TaskCategory) => void;
  updateTask: (taskId: string, updates: Partial<Omit<Task, 'id' | 'subtasks'>>) => void;
  deleteTask: (taskId: string) => void;
  addSubtask: (taskId: string, title: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  setDailyPlan: (date: string, taskIds: string[], subtaskIds: string[]) => void;
  setWeeklyPlan: (weekStart: string, taskIds: string[], subtaskIds: string[]) => void;
}

function nowIso() {
  return new Date().toISOString();
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set) => ({
      tasks: [],
      dailyPlans: [],
      weeklyPlans: [],
      settings: {
        lastActiveDate: null,
        lastWeekStart: null,
      },

      addTask: (title, category = 'normal') =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              journal: '',
              status: 'open',
              category,
              createdAt: nowIso(),
              updatedAt: nowIso(),
              completedAt: null,
              subtasks: [],
            },
          ],
        })),

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates, updatedAt: nowIso() } : task,
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      addSubtask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: [...task.subtasks, { id: crypto.randomUUID(), title, done: false }],
                  updatedAt: nowIso(),
                }
              : task,
          ),
        })),

      toggleSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((subtask) =>
                    subtask.id === subtaskId ? { ...subtask, done: !subtask.done } : subtask,
                  ),
                  updatedAt: nowIso(),
                }
              : task,
          ),
        })),

      deleteSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId),
                  updatedAt: nowIso(),
                }
              : task,
          ),
        })),
      setDailyPlan: (date, taskIds, subtaskIds) =>
        set((state) => ({
          dailyPlans: [
            ...state.dailyPlans.filter((plan) => plan.date !== date),
            { date, taskIds, subtaskIds },
          ],
          settings: { ...state.settings, lastActiveDate: date },
        })),

      setWeeklyPlan: (weekStart, taskIds, subtaskIds) =>
        set((state) => ({
          weeklyPlans: [
            ...state.weeklyPlans.filter((plan) => plan.weekStart !== weekStart),
            { weekStart, taskIds, subtaskIds },
          ],
          settings: { ...state.settings, lastWeekStart: weekStart },
        })),
    }),
    {
      name: 'workflow-app.data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
