import { format, startOfWeek } from 'date-fns';

export function getTodayIso(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getWeekStartIso(): string {
  return format(startOfWeek(new Date(), { weekStartsOn: 0 }), 'yyyy-MM-dd');
}
