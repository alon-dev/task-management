import { useEffect, useState } from 'react';
import { useWorkflowStore } from '@/data/store';
import { getTodayIso, getWeekStartIso } from './dateUtils';
import { PlanningDialog } from './PlanningDialog';
import { usePlanningUiStore } from './planningUiStore';

type ActivePrompt = 'weekly' | 'daily' | null;

export function PlanningPrompts() {
  const settings = useWorkflowStore((state) => state.settings);
  const dailyPlans = useWorkflowStore((state) => state.dailyPlans);
  const weeklyPlans = useWorkflowStore((state) => state.weeklyPlans);
  const setDailyPlan = useWorkflowStore((state) => state.setDailyPlan);
  const setWeeklyPlan = useWorkflowStore((state) => state.setWeeklyPlan);
  const forceWeeklyPrompt = usePlanningUiStore((state) => state.forceWeeklyPrompt);
  const forceDailyPrompt = usePlanningUiStore((state) => state.forceDailyPrompt);
  const clearForcedPrompts = usePlanningUiStore((state) => state.clearForcedPrompts);

  const todayIso = getTodayIso();
  const weekStartIso = getWeekStartIso();
  const needsWeekly = settings.lastWeekStart !== weekStartIso;
  const needsDaily = settings.lastActiveDate !== todayIso;

  const [activePrompt, setActivePrompt] = useState<ActivePrompt>(() => {
    if (needsWeekly) return 'weekly';
    if (needsDaily) return 'daily';
    return null;
  });
  const [returnToDaily, setReturnToDaily] = useState(false);

  useEffect(() => {
    if (forceWeeklyPrompt) {
      setActivePrompt('weekly');
      clearForcedPrompts();
    } else if (forceDailyPrompt) {
      setActivePrompt('daily');
      clearForcedPrompts();
    }
  }, [forceWeeklyPrompt, forceDailyPrompt, clearForcedPrompts]);

  const currentWeeklyPlan = weeklyPlans.find((plan) => plan.weekStart === weekStartIso);
  const currentDailyPlan = dailyPlans.find((plan) => plan.date === todayIso);

  function handleWeeklySubmit(taskIds: string[], subtaskIds: string[]) {
    setWeeklyPlan(weekStartIso, taskIds, subtaskIds);
    if (returnToDaily) {
      setReturnToDaily(false);
      setActivePrompt('daily');
    } else {
      setActivePrompt(needsDaily ? 'daily' : null);
    }
  }

  function handleDailySubmit(taskIds: string[], subtaskIds: string[]) {
    setDailyPlan(todayIso, taskIds, subtaskIds);
    setActivePrompt(null);
  }

  return (
    <>
      <PlanningDialog
        open={activePrompt === 'weekly'}
        title="אילו משימות תרצה להספיק השבוע?"
        description="בחר את המשימות והתתי-משימות שברצונך למקד בהן השבוע. תמיד אפשר לשנות זאת מאוחר יותר."
        initialTaskIds={currentWeeklyPlan?.taskIds ?? []}
        initialSubtaskIds={currentWeeklyPlan?.subtaskIds ?? []}
        onSubmit={handleWeeklySubmit}
      />
      <PlanningDialog
        open={activePrompt === 'daily'}
        title="אילו משימות תרצה להספיק היום?"
        description="בחר את המשימות והתתי-משימות שברצונך למקד בהן היום."
        initialTaskIds={currentDailyPlan?.taskIds ?? []}
        initialSubtaskIds={currentDailyPlan?.subtaskIds ?? []}
        onSubmit={handleDailySubmit}
        footerLink={{
          label: 'שנה גם את משימות השבוע',
          onClick: () => {
            setReturnToDaily(true);
            setActivePrompt('weekly');
          },
        }}
      />
    </>
  );
}
