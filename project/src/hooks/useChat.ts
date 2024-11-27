import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatbotState } from '../types';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const [state, setState] = useState<ChatbotState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const botResponse = await chatService.sendMessage(content);
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, {
          ...botResponse,
          id: uuidv4(),
          timestamp: new Date(),
        }],
        isLoading: false,
      }));

      if (botResponse.content.includes("forward this question to the professor")) {
        await chatService.escalateToProfessor(content, state.messages);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to process your message. Please try again.',
      }));
    }
  }, [state.messages]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
  };
};