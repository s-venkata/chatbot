export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface CourseResource {
  id: string;
  type: 'syllabus' | 'notes' | 'assignment' | 'faq';
  title: string;
  content: string;
  lastUpdated: Date;
}

export interface ChatbotState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}