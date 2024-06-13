import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';

const ChatModule: React.FC<{ blogContent: string; blogTitle: string; userId: string | null; blogId: string }> = ({ blogContent, blogTitle, userId, blogId }) => {
  const navigate = useNavigate();
  const { messages, userInput, isLoading, setUserInput, sendMessage, resetChat, chatContainerRef } = useChat(blogContent, blogTitle, userId, blogId);
  const inputRef = useRef<HTMLInputElement>(null);
  const CHAT_LIMIT = 20; // This should match the limit in useChat.ts

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, chatContainerRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      navigate('/signin');
      return;
    }
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!userId) {
        navigate('/signin');
        return;
      }
      sendMessage();
    }
  };

  if (!userId) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg max-w-3xl mx-auto">
        <hr className="mb-4 border-gray-300" />
        <div className="text-2xl font-semibold mb-4 text-gray-800">Please sign in to ask questions to AI✨</div>
        <button
          onClick={() => navigate('/signin')}
          className="ml-3 bg-[#0a8660] text-white p-2 rounded-lg hover:bg-[#374151] transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 border border-gray-200 bg-white rounded-lg max-w-3xl mx-auto">
      <hr className="mb-6 border-gray-300" />
      <div className="text-2xl font-semibold mb-6 text-gray-800">Have any doubts? Ask AI.</div>
      <div
        ref={chatContainerRef}
        className="h-96 overflow-y-auto mb-4 p-4  rounded-lg flex flex-col space-y-4 transition-all duration-300"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-[#d1e7dd] border border-gray-300 self-end' : 'bg-white border border-gray-200 self-start'}`}
          >
            <strong className="font-semibold">{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong> {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-500">Assistant is typing...</div>}
        {messages.length >= CHAT_LIMIT && (
          <div className="text-gray-500 font-semibold">Chat limit reached. Please reset the chat to continue.</div>
        )}
      </div>
      <div className="flex items-center">
        <form onSubmit={handleSubmit} className="flex-grow flex items-center bg-white rounded-full border border-gray-300 p-2 shadow-inner">
          <input
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your doubts here..."
            className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
            disabled={!userId || messages.length >= CHAT_LIMIT}
          />
          <button
            type="submit"
            className="bg-[#e2f2e9] p-2 rounded-full hover:bg-[#c0dfd3] transition-colors"
            disabled={isLoading || !userId || messages.length >= CHAT_LIMIT}
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </form>
        <div className="ml-4 cursor-pointer" onClick={resetChat}>
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1M4.93 4.93l.707.707M2 12h1m16.071 0h1M19.07 4.93l.707.707M12 19v1m7.071-7.071l.707.707M12 12l-8 8m0-16l8 8" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2">* Resetting the chat will delete the chat history.</div>
    </div>
  );
};

export default ChatModule;
