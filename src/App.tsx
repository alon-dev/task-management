import { useState } from 'react';
import { X } from 'lucide-react';
import { AppShell } from './shell/AppShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkflowStore } from './data/store';

function App() {
  const tasks = useWorkflowStore((state) => state.tasks);
  const addTask = useWorkflowStore((state) => state.addTask);
  const deleteTask = useWorkflowStore((state) => state.deleteTask);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleAddTask() {
    const title = newTaskTitle.trim();
    if (title === '') return;
    addTask(title);
    setNewTaskTitle('');
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">טופ משימות להיום</h1>
      <p className="mt-2 text-muted-foreground">
        ניהול משימות ותכנון יומי מגיעים בשלבים הבאים.
      </p>

      <div className="mt-6 flex max-w-md gap-2">
        <Input
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleAddTask()}
          placeholder="הוספת משימה חדשה"
        />
        <Button type="button" onClick={handleAddTask}>
          הוסף
        </Button>
      </div>

      <ul className="mt-6 max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-md border px-3 py-2"
          >
            <span>{task.title}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              aria-label="מחק משימה"
            >
              <X size={16} />
            </Button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

export default App;
