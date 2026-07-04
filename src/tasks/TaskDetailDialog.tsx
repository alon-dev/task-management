import { lazy, Suspense, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWorkflowStore } from '@/data/store';
import type { TaskCategory } from '@/data/types';
import { CATEGORY_LABELS } from './categoryLabels';

const JournalEditor = lazy(() =>
  import('./JournalEditor').then((module) => ({ default: module.JournalEditor })),
);

interface TaskDetailDialogProps {
  taskId: string | null;
  onClose: () => void;
}

export function TaskDetailDialog({ taskId, onClose }: TaskDetailDialogProps) {
  const task = useWorkflowStore((state) => state.tasks.find((item) => item.id === taskId));
  const updateTask = useWorkflowStore((state) => state.updateTask);
  const deleteTask = useWorkflowStore((state) => state.deleteTask);
  const addSubtask = useWorkflowStore((state) => state.addSubtask);
  const toggleSubtask = useWorkflowStore((state) => state.toggleSubtask);
  const deleteSubtask = useWorkflowStore((state) => state.deleteSubtask);

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  if (!task) return null;

  function handleAddSubtask() {
    const trimmed = newSubtaskTitle.trim();
    if (trimmed === '' || !task) return;
    addSubtask(task.id, trimmed);
    setNewSubtaskTitle('');
  }

  function handleDelete() {
    if (!task) return;
    deleteTask(task.id);
    onClose();
  }

  return (
    <Dialog
      open={taskId !== null}
      onOpenChange={(open) => {
        if (!open) {
          setNewSubtaskTitle('');
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>פרטי משימה</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="detail-title">כותרת</Label>
            <Input
              id="detail-title"
              value={task.title}
              onChange={(event) => updateTask(task.id, { title: event.target.value })}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="detail-done"
                checked={task.status === 'done'}
                onCheckedChange={(checked) =>
                  updateTask(task.id, {
                    status: checked ? 'done' : 'open',
                    completedAt: checked ? new Date().toISOString() : null,
                  })
                }
              />
              <Label htmlFor="detail-done">הושלמה</Label>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="detail-category">קטגוריה</Label>
              <Select
                value={task.category}
                onValueChange={(value) => updateTask(task.id, { category: value as TaskCategory })}
              >
                <SelectTrigger id="detail-category" className="w-32">
                  <SelectValue>{(value: TaskCategory) => CATEGORY_LABELS[value]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">{CATEGORY_LABELS.normal}</SelectItem>
                  <SelectItem value="backlog">{CATEGORY_LABELS.backlog}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>תתי-משימות</Label>
            <ul className="space-y-1">
              {task.subtasks.map((subtask) => (
                <li key={subtask.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={subtask.done}
                    onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                  />
                  <span
                    className={
                      subtask.done ? 'flex-1 text-muted-foreground line-through' : 'flex-1'
                    }
                  >
                    {subtask.title}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSubtask(task.id, subtask.id)}
                    aria-label="מחק תת-משימה"
                  >
                    <X size={14} />
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Input
                value={newSubtaskTitle}
                onChange={(event) => setNewSubtaskTitle(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleAddSubtask()}
                placeholder="תת-משימה חדשה"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddSubtask}
                aria-label="הוסף תת-משימה"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>יומן משימה</Label>
            <Suspense fallback={<div className="h-[200px] rounded-md border" />}>
              <JournalEditor
                value={task.journal}
                onChange={(journal) => updateTask(task.id, { journal })}
              />
            </Suspense>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="destructive" className="gap-2" onClick={handleDelete}>
            <Trash2 size={16} />
            מחק משימה
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
