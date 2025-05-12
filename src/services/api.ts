// services/api.ts
import axios, { type AxiosRequestConfig } from "axios";
import type { Task, TaskValues } from "@/types/task";
import { api } from "@/lib/axios";

const API_URL = import.meta.env.VITE_API_URL;

export const taskService = {
  getTasks: async (config?: AxiosRequestConfig): Promise<Task[]> => {
    const response = await api.get(`/tasks`, config);
    return response.data;
  },

  createTask: async (values: TaskValues): Promise<Task> => {
    const response = await api.post(`/tasks`, values);
    return response.data;
  },

  updateTask: async (id: string, values: TaskValues): Promise<void> => {
    await api.put(`/tasks/${id}`, values);
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export const authService = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },
  register: async (credentials: { username: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    return response.data;
  },
};
