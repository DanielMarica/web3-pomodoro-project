import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axiosInstance';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { Session } from '../../types/session.types';
import type { TimerMode } from '../../types/timer.types';

interface SaveSessionPayload {
  type: TimerMode;
  duration: number;
  taskId?: string;
}

export const saveSession = createAsyncThunk(
  'timer/saveSession',
  async (payload: SaveSessionPayload) => {
    const response = await api.post<Session>(API_ENDPOINTS.sessions, {
      type: payload.type,
      duration: payload.duration,
      completedAt: new Date().toISOString(),
      taskId: payload.taskId,
    });
    return response.data;
  }
);
