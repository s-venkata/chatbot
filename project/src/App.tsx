import React from 'react';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { GraduationCap } from 'lucide-react';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[80vh]">
        <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
          <GraduationCap size={24} />
          <h1 className="text-xl font-semibold">Course Assistant</h1>
        </div>
        
        <ChatContainer messages={messages} />
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <div className="p-4 border-t">
          <ChatInput 
            onSendMessage={sendMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;