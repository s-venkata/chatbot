import { apiClient } from './api';
import { API_CONFIG } from '../config/api';
import { Message, CourseResource } from '../types';

export const chatService = {
  async sendMessage(message: string): Promise<Message> {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CHAT, { message });
    return response.data;
  },

  async getResources(): Promise<CourseResource[]> {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.RESOURCES);
    return response.data;
  },

  async escalateToProfessor(query: string, context: Message[]): Promise<void> {
    await apiClient.post(API_CONFIG.ENDPOINTS.ESCALATE, {
      query,
      context
    });
  }
};