import type { Task } from '@/data/types';

const AGING_THRESHOLD_DAYS = 14;
const FULLY_RED_AFTER_DAYS = 56;

/**
 * Returns 0 for tasks that shouldn't redden yet (backlog, done, or under two
 * weeks old), scaling up to 1 as a task keeps aging past the threshold.
 */
export function getTaskAgingHeat(task: Task, now: Date = new Date()): number {
  if (task.category === 'backlog' || task.status === 'done') return 0;

  const ageDays = (now.getTime() - new Date(task.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays <= AGING_THRESHOLD_DAYS) return 0;

  const overDays = ageDays - AGING_THRESHOLD_DAYS;
  const maxOverDays = FULLY_RED_AFTER_DAYS - AGING_THRESHOLD_DAYS;
  return Math.min(overDays / maxOverDays, 1);
}

export function getTaskAgingStyle(task: Task, now: Date = new Date()) {
  const heat = getTaskAgingHeat(task, now);
  if (heat === 0) return undefined;

  return {
    borderColor: `rgba(239, 68, 68, ${0.3 + heat * 0.7})`,
    backgroundColor: `rgba(239, 68, 68, ${heat * 0.12})`,
  };
}
