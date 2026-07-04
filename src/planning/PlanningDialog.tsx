import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useWorkflowStore } from '@/data/store';

interface PlanningDialogProps {
  open: boolean;
  title: string;
  description: string;
  initialTaskIds: string[];
  initialSubtaskIds: string[];
  onSubmit: (taskIds: string[], subtaskIds: string[]) => void;
  footerLink?: { label: string; onClick: () => void };
}

export function PlanningDialog({
  open,
  title,
  description,
  initialTaskIds,
  initialSubtaskIds,
  onSubmit,
  footerLink,
}: PlanningDialogProps) {
  const tasks = useWorkflowStore((state) => state.tasks);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set(initialTaskIds));
  const [selectedSubtaskIds, setSelectedSubtaskIds] = useState<Set<string>>(
    new Set(initialSubtaskIds),
  );

  function toggleTask(taskId: string) {
    setSelectedTaskIds((current) => {
      const next = new Set(current);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  }

  function toggleSubtask(subtaskId: string) {
    setSelectedSubtaskIds((current) => {
      const next = new Set(current);
      if (next.has(subtaskId)) {
        next.delete(subtaskId);
      } else {
        next.add(subtaskId);
      }
      return next;
    });
  }

  const openTasks = tasks.filter((task) => task.status !== 'done');

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {openTasks.length === 0 ? (
          <p className="text-muted-foreground">
            עדיין אין משימות פתוחות. אפשר להוסיף משימות ולחזור לכאן.
          </p>
        ) : (
          <ul className="space-y-3">
            {openTasks.map((task) => (
              <li key={task.id} className="space-y-1">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedTaskIds.has(task.id)}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>
                {task.subtasks.filter((subtask) => !subtask.done).length > 0 && (
                  <ul className="me-6 space-y-1">
                    {task.subtasks
                      .filter((subtask) => !subtask.done)
                      .map((subtask) => (
                        <li key={subtask.id}>
                          <label className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedSubtaskIds.has(subtask.id)}
                              onCheckedChange={() => toggleSubtask(subtask.id)}
                            />
                            <span className="text-sm text-muted-foreground">{subtask.title}</span>
                          </label>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}

        <DialogFooter className="sm:justify-between">
          {footerLink ? (
            <button
              type="button"
              onClick={footerLink.onClick}
              className="text-sm text-muted-foreground underline"
            >
              {footerLink.label}
            </button>
          ) : (
            <span />
          )}
          <Button
            type="button"
            onClick={() => onSubmit(Array.from(selectedTaskIds), Array.from(selectedSubtaskIds))}
          >
            שמור
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
