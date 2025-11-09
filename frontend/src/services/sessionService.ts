import { api } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type { Session } from '../types/session.types';
import type { TimerMode } from '../types/timer.types';

interface CreateSessionDTO {
  type: TimerMode;
  duration: number;
  completedAt: string;
  taskId?: string;
}

interface SessionStats {
  totalSessions: number;
  totalFocusTime: number;
  totalBreakTime: number;
  averageSessionDuration: number;
  sessionsToday: number;
  sessionsThisWeek: number;
}

export const sessionService = {
  async createSession(data: CreateSessionDTO): Promise<Session> {
    const response = await api.post<Session>(API_ENDPOINTS.sessions, data);
    return response.data;
  },

  async getSessions(): Promise<Session[]> {
    const response = await api.get<Session[]>(API_ENDPOINTS.sessions);
    return response.data;
  },

  async getSessionById(id: string): Promise<Session> {
    const response = await api.get<Session>(API_ENDPOINTS.sessionById(id));
    return response.data;
  },

  async getStats(): Promise<SessionStats> {
    const response = await api.get<SessionStats>(API_ENDPOINTS.sessionStats);
    return response.data;
  },

  async deleteSession(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.sessionById(id));
  },
};
