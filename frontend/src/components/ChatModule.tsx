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
    <div className="mt-6 p-6 bg-white rounded-lg max-w-3xl mx-auto">
      <div className="text-2xl font-semibold mb-6 text-gray-800">Have any doubts? Ask AI.</div>
      <hr className="mb-6 border-gray-300" />
      <div
        ref={chatContainerRef}
        className="h-96 overflow-y-auto mb-4 p-4  rounded-lg flex flex-col space-y-4 transition-all duration-300"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-[#e2f2e9] border border-gray-300 self-end' : 'bg-white border border-gray-200 self-start'}`}
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
        <div className="ml-4 cursor-pointer p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" onClick={resetChat}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 50 50">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 A 1.0001 1.0001 0 1 0 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 C 31.692686 4 37.635193 7.130711 41.480469 12 L 35 12 A 1.0001 1.0001 0 1 0 35 14 L 43.449219 14 L 45 14 L 45 4 A 1.0001 1.0001 0 0 0 43.984375 2.9863281 A 1.0001 1.0001 0 0 0 43 4 L 43 10.699219 C 38.785186 5.4020866 32.287796 2 25 2 z"></path>
          </svg>
        </div>
      </div>
      <div className="text-sm text-gray-500 ml-5 mt-2">* Resetting the chat will delete the chat history.</div>
    </div>
  );
};

export default ChatModule;
