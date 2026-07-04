import { Inbox } from 'lucide-react';
import type { Task } from '@/data/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  emptyMessage: string;
  onOpenDetail: (taskId: string) => void;
}

export function TaskList({ tasks, emptyMessage, onOpenDetail }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border border-dashed py-10 text-muted-foreground">
        <Inbox size={28} />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onOpenDetail={onOpenDetail} />
      ))}
    </ul>
  );
}
