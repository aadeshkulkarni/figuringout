import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../hooks/useChat';

interface ChatModuleProps {
  blogContent: string;
}

const ChatModule: React.FC<ChatModuleProps> = ({ blogContent }) => {
  const { messages, userInput, isLoading, setUserInput, sendMessage, resetChat, chatContainerRef } = useChat(blogContent);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, chatContainerRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    if (!isChatVisible) {
      setIsChatVisible(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      if (!isChatVisible) {
        setIsChatVisible(true);
      }
    }
  };

  const handleReset = () => {
    resetChat();
    setIsChatVisible(false);
  };

  return (
    <div className="mt-8 p-4 bg-[#faf5ef] rounded-lg max-w-3xl mx-auto shadow-md">
      <div className="text-2xl font-semibold mb-4">Have any doubts? Ask AI.</div>
      {isChatVisible && (
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto mb-4 p-4 bg-white rounded border border-gray-300 flex flex-col space-y-4 transition-all duration-300"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-[#f4f4f4] self-end' : 'bg-[#f9f1e9] self-start'}`}
            >
              <strong className="font-semibold">{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong> {msg.content}
            </div>
          ))}
          {isLoading && <div className="text-gray-500">Assistant is typing...</div>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full border border-gray-300 p-2 shadow-inner">
        <input
          type="text"
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Talk with Pi"
          className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#f4f4f4] p-2 rounded-full hover:bg-gray-200 transition-colors"
          disabled={isLoading}
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </form>
      {isChatVisible && (
        <button
          onClick={handleReset}
          className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Reset Chat
        </button>
      )}
    </div>
  );
};

export default ChatModule;
