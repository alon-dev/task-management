import { Circle, CircleCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWorkflowStore } from '@/data/store';
import type { Task } from '@/data/types';
import { getTaskAgingStyle } from './taskAging';

interface TaskItemProps {
  task: Task;
  onOpenDetail: (taskId: string) => void;
}

export function TaskItem({ task, onOpenDetail }: TaskItemProps) {
  const updateTask = useWorkflowStore((state) => state.updateTask);
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done).length;
  const isDone = task.status === 'done';
  const agingStyle = getTaskAgingStyle(task);

  return (
    <li
      onClick={() => onOpenDetail(task.id)}
      style={agingStyle}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-2 transition-colors hover:bg-accent"
    >
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(event) => {
            event.stopPropagation();
            updateTask(task.id, {
              status: isDone ? 'open' : 'done',
              completedAt: isDone ? null : new Date().toISOString(),
            });
          }}
          aria-label="שנה סטטוס"
        >
          {isDone ? <CircleCheck size={18} /> : <Circle size={18} />}
        </Button>
        <span className={isDone ? 'text-muted-foreground line-through' : ''}>{task.title}</span>
        {task.category === 'backlog' && <Badge variant="secondary">בקלוג</Badge>}
      </div>
      {task.subtasks.length > 0 && (
        <span className="text-sm text-muted-foreground">
          {doneSubtasks}/{task.subtasks.length}
        </span>
      )}
    </li>
  );
}
