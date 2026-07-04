import { create } from 'zustand';

interface PlanningUiState {
  forceWeeklyPrompt: boolean;
  forceDailyPrompt: boolean;
  requestWeeklyReconfigure: () => void;
  requestDailyReconfigure: () => void;
  clearForcedPrompts: () => void;
}

export const usePlanningUiStore = create<PlanningUiState>((set) => ({
  forceWeeklyPrompt: false,
  forceDailyPrompt: false,
  requestWeeklyReconfigure: () => set({ forceWeeklyPrompt: true }),
  requestDailyReconfigure: () => set({ forceDailyPrompt: true }),
  clearForcedPrompts: () => set({ forceWeeklyPrompt: false, forceDailyPrompt: false }),
}));
