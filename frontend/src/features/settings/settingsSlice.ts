import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  workDuration: number;       // Minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  theme: 'light' | 'dark';
}

const initialState: SettingsState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  musicEnabled: false,
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setWorkDuration: (state, action: PayloadAction<number>) => {
      state.workDuration = action.payload;
    },
    setShortBreakDuration: (state, action: PayloadAction<number>) => {
      state.shortBreakDuration = action.payload;
    },
    setLongBreakDuration: (state, action: PayloadAction<number>) => {
      state.longBreakDuration = action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleMusic: (state) => {
      state.musicEnabled = !state.musicEnabled;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { 
  setWorkDuration, 
  setShortBreakDuration, 
  setLongBreakDuration,
  toggleSound,
  toggleMusic, 
  setTheme 
} = settingsSlice.actions;

export default settingsSlice.reducer;
