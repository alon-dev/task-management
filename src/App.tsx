import { useState } from 'react';
import { AppShell } from './shell/AppShell';
import type { ViewKey } from './shell/types';
import { AddTaskDialog } from './tasks/AddTaskDialog';
import { TaskDetailDialog } from './tasks/TaskDetailDialog';
import { TaskList } from './tasks/TaskList';
import { useWorkflowStore } from './data/store';

const VIEW_TITLES: Record<ViewKey, string> = {
  today: 'המשימות המובילות של היום',
  week: 'המשימות המובילות של השבוע',
  all: 'כל המשימות',
  backlog: 'בקלוג',
};

function App() {
  const tasks = useWorkflowStore((state) => state.tasks);
  const [activeView, setActiveView] = useState<ViewKey>('today');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const isPlanningView = activeView === 'today' || activeView === 'week';
  const visibleTasks =
    activeView === 'backlog' ? tasks.filter((task) => task.category === 'backlog') : tasks;

  return (
    <AppShell activeView={activeView} onSelectView={setActiveView}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{VIEW_TITLES[activeView]}</h1>
        {!isPlanningView && <AddTaskDialog />}
      </div>

      <div className="mt-6 max-w-lg">
        {isPlanningView ? (
          <p className="text-muted-foreground">תכנון יומי ושבועי יתווספו בשלב הבא.</p>
        ) : (
          <TaskList
            tasks={visibleTasks}
            emptyMessage={activeView === 'backlog' ? 'אין משימות בבקלוג' : 'עדיין אין משימות'}
            onOpenDetail={setSelectedTaskId}
          />
        )}
      </div>

      <TaskDetailDialog taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
    </AppShell>
  );
}

export default App;
