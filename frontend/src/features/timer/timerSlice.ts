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
      // Ajuste la durée selon le mode
      if (action.payload === 'focus') {
        state.totalTime = 25 * 60;
      } else if (action.payload === 'shortBreak') {
        state.totalTime = 5 * 60;
      } else {
        state.totalTime = 15 * 60;
      }
      state.timeLeft = state.totalTime;
    },
    setCustomTime: (state, action: PayloadAction<number>) => {
      state.totalTime = action.payload * 60;
      state.timeLeft = action.payload * 60;
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
  completePomodoro 
} = timerSlice.actions;

export default timerSlice.reducer;
