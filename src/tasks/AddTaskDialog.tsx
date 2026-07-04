import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function AddTaskDialog() {
  const addTask = useWorkflowStore((state) => state.addTask);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('normal');

  function handleSubmit() {
    const trimmed = title.trim();
    if (trimmed === '') return;
    addTask(trimmed, category);
    setTitle('');
    setCategory('normal');
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" className="gap-2" />}>
        <Plus size={16} />
        משימה חדשה
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>משימה חדשה</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">כותרת</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
              placeholder="לדוגמה: לסיים דוח רבעוני"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label>קטגוריה</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as TaskCategory)}
            >
              <SelectTrigger>
                <SelectValue>{(value: TaskCategory) => CATEGORY_LABELS[value]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{CATEGORY_LABELS.normal}</SelectItem>
                <SelectItem value="backlog">{CATEGORY_LABELS.backlog}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            הוסף משימה
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
