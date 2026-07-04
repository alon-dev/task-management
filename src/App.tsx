import { useState } from 'react';
import { AppShell } from './shell/AppShell';
import type { ViewKey } from './shell/types';
import { AddTaskDialog } from './tasks/AddTaskDialog';
import { TaskDetailDialog } from './tasks/TaskDetailDialog';
import { TaskList } from './tasks/TaskList';
import { useWorkflowStore } from './data/store';
import { getTodayIso, getWeekStartIso } from './planning/dateUtils';
import { PlanTasksView } from './planning/PlanTasksView';
import { PlanningPrompts } from './planning/PlanningPrompts';
import { usePlanningUiStore } from './planning/planningUiStore';

const VIEW_TITLES: Record<ViewKey, string> = {
  today: 'המשימות המובילות של היום',
  week: 'המשימות המובילות של השבוע',
  all: 'כל המשימות',
  backlog: 'בקלוג',
};

function App() {
  const tasks = useWorkflowStore((state) => state.tasks);
  const dailyPlans = useWorkflowStore((state) => state.dailyPlans);
  const weeklyPlans = useWorkflowStore((state) => state.weeklyPlans);
  const [activeView, setActiveView] = useState<ViewKey>('today');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const isPlanningView = activeView === 'today' || activeView === 'week';
  const visibleTasks =
    activeView === 'backlog' ? tasks.filter((task) => task.category === 'backlog') : tasks;

  const todayPlan = dailyPlans.find((plan) => plan.date === getTodayIso());
  const weekPlan = weeklyPlans.find((plan) => plan.weekStart === getWeekStartIso());

  return (
    <AppShell activeView={activeView} onSelectView={setActiveView}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{VIEW_TITLES[activeView]}</h1>
        {!isPlanningView && <AddTaskDialog />}
      </div>

      <div className="mt-6 max-w-lg">
        {activeView === 'today' && (
          <PlanTasksView
            taskIds={todayPlan?.taskIds ?? []}
            subtaskIds={todayPlan?.subtaskIds ?? []}
            emptyMessage="לא נבחרו משימות להיום"
            reconfigureLabel="שנה את משימות היום"
            onReconfigure={() => usePlanningUiStore.getState().requestDailyReconfigure()}
            onOpenTaskDetail={setSelectedTaskId}
          />
        )}
        {activeView === 'week' && (
          <PlanTasksView
            taskIds={weekPlan?.taskIds ?? []}
            subtaskIds={weekPlan?.subtaskIds ?? []}
            emptyMessage="לא נבחרו משימות לשבוע"
            reconfigureLabel="שנה את משימות השבוע"
            onReconfigure={() => usePlanningUiStore.getState().requestWeeklyReconfigure()}
            onOpenTaskDetail={setSelectedTaskId}
          />
        )}
        {!isPlanningView && (
          <TaskList
            tasks={visibleTasks}
            emptyMessage={activeView === 'backlog' ? 'אין משימות בבקלוג' : 'עדיין אין משימות'}
            onOpenDetail={setSelectedTaskId}
          />
        )}
      </div>

      <TaskDetailDialog taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
      <PlanningPrompts />
    </AppShell>
  );
}

export default App;
