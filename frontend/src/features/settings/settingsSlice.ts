import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  workDuration: number;       // Minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  selectedMusic: string;      // ID de la musique sélectionnée
  theme: 'light' | 'dark';
}

const initialState: SettingsState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  musicEnabled: false,
  selectedMusic: 'groovy-vibe',    // Musique par défaut
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
    setSelectedMusic: (state, action: PayloadAction<string>) => {
      state.selectedMusic = action.payload;
    },
  },
});

export const { 
  setWorkDuration, 
  setShortBreakDuration, 
  setLongBreakDuration,
  toggleSound,
  toggleMusic, 
  setTheme,
  setSelectedMusic
} = settingsSlice.actions;

export default settingsSlice.reducer;
