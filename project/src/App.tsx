import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, CourseResource, ChatbotState } from './types';
import { generateResponse, shouldEscalateToProfessor } from './utils/chatUtils';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { GraduationCap } from 'lucide-react';

// Mock course resources - in a real app, this would come from an API or database
const mockResources: CourseResource[] = [
  {
    id: '1',
    type: 'syllabus',
    title: 'Course Syllabus',
    content: 'This course covers advanced topics in computer science...',
    lastUpdated: new Date(),
  },
  // Add more mock resources as needed
];

function App() {
  const [state, setState] = useState<ChatbotState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const handleSendMessage = async (content: string) => {
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
    }));

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const shouldEscalate = shouldEscalateToProfessor(content, mockResources);
      const response = generateResponse(content, mockResources);

      const botMessage: Message = {
        id: uuidv4(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));

      if (shouldEscalate) {
        // In a real app, implement professor notification logic here
        console.log('Escalating to professor:', content);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to process your message. Please try again.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[80vh]">
        <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
          <GraduationCap size={24} />
          <h1 className="text-xl font-semibold">Course Assistant</h1>
        </div>
        
        <ChatContainer messages={state.messages} />
        
        {state.error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm">
            {state.error}
          </div>
        )}
        
        <div className="p-4 border-t">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={state.isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;