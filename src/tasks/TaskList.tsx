import type { Task } from '@/data/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  emptyMessage: string;
  onOpenDetail: (taskId: string) => void;
}

export function TaskList({ tasks, emptyMessage, onOpenDetail }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onOpenDetail={onOpenDetail} />
      ))}
    </ul>
  );
}
