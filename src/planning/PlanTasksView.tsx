import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useWorkflowStore } from '@/data/store';
import { TaskItem } from '@/tasks/TaskItem';

interface PlanTasksViewProps {
  taskIds: string[];
  subtaskIds: string[];
  emptyMessage: string;
  reconfigureLabel: string;
  onReconfigure: () => void;
  onOpenTaskDetail: (taskId: string) => void;
}

export function PlanTasksView({
  taskIds,
  subtaskIds,
  emptyMessage,
  reconfigureLabel,
  onReconfigure,
  onOpenTaskDetail,
}: PlanTasksViewProps) {
  const tasks = useWorkflowStore((state) => state.tasks);
  const toggleSubtask = useWorkflowStore((state) => state.toggleSubtask);

  const selectedTasks = tasks.filter((task) => taskIds.includes(task.id));
  const standaloneSubtasks = tasks.flatMap((task) =>
    task.subtasks
      .filter((subtask) => subtaskIds.includes(subtask.id) && !taskIds.includes(task.id))
      .map((subtask) => ({ task, subtask })),
  );
  const isEmpty = selectedTasks.length === 0 && standaloneSubtasks.length === 0;

  return (
    <div className="space-y-4">
      <Button type="button" variant="outline" size="sm" onClick={onReconfigure}>
        {reconfigureLabel}
      </Button>

      {isEmpty ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <ul className="max-w-lg space-y-2">
          {selectedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onOpenDetail={onOpenTaskDetail} />
          ))}
          {standaloneSubtasks.map(({ task, subtask }) => (
            <li
              key={subtask.id}
              className="flex items-center gap-3 rounded-md border px-3 py-2"
            >
              <Checkbox
                checked={subtask.done}
                onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
              />
              <span className={subtask.done ? 'text-muted-foreground line-through' : ''}>
                {task.title}: {subtask.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
