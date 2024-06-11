import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_HISTORY_KEY = 'chatHistory';
const MAX_CHAT_HISTORY = 20; // Example limit

export const useChat = (blogContent: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '[]');
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-MAX_CHAT_HISTORY)));
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage or any other storage you use
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/chat`, 
        { blogContent, userQuery: userInput, chatHistory: messages },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAssistantMessage: ChatMessage = { role: 'assistant', content: response.data.message };
      setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: ChatMessage = { role: 'assistant', content: 'Sorry, an error occurred.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  };

  return {
    messages,
    userInput,
    isLoading,
    setUserInput,
    sendMessage,
    resetChat,
    chatContainerRef,
  };
};