import { api } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type { Task } from '../types/task.types';

interface CreateTaskDTO {
  title: string;
  completed?: boolean;
  pomodorosCount?: number;
}

export const taskService = {
  async createTask(data: CreateTaskDTO): Promise<Task> {
    const response = await api.post<Task>(API_ENDPOINTS.tasks, data);
    return response.data;
  },

  async getTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>(API_ENDPOINTS.tasks);
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get<Task>(API_ENDPOINTS.taskById(id));
    return response.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.put<Task>(API_ENDPOINTS.taskById(id), data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.taskById(id));
  },

  async toggleTask(id: string): Promise<Task> {
    const task = await this.getTaskById(id);
    return this.updateTask(id, { completed: !task.completed });
  },
};
