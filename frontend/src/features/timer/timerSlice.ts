import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TimerState, TimerMode } from '../../types/timer.types';

const initialState: TimerState = {
  timeLeft: 25 * 60,          // 25 minutes par défaut
  totalTime: 25 * 60,
  isRunning: false,
  mode: 'focus',
  completedPomodoros: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    resetTimer: (state) => {
      state.timeLeft = state.totalTime;
      state.isRunning = false;
    },
    setMode: (state, action: PayloadAction<TimerMode>) => {
      state.mode = action.payload;
      // Note: la durée sera mise à jour via updateTimerDuration
    },
    setCustomTime: (state, action: PayloadAction<number>) => {
      state.totalTime = action.payload * 60;
      state.timeLeft = action.payload * 60;
    },
    // Nouvelle action pour mettre à jour le timer selon les settings
    updateTimerDuration: (state, action: PayloadAction<{ duration: number; resetTime?: boolean }>) => {
      const durationInSeconds = action.payload.duration * 60;
      state.totalTime = durationInSeconds;
      // Reset timeLeft seulement si demandé ou si le timer n'est pas en cours
      if (action.payload.resetTime || !state.isRunning) {
        state.timeLeft = durationInSeconds;
      }
    },
    completePomodoro: (state) => {
      state.completedPomodoros += 1;
    },
  },
});

export const { 
  startTimer, 
  pauseTimer, 
  tick, 
  resetTimer, 
  setMode, 
  setCustomTime,
  updateTimerDuration,
  completePomodoro 
} = timerSlice.actions;

export default timerSlice.reducer;
