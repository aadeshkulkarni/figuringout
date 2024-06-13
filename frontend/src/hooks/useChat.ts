import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import useLocalStorage from './useLocalStorage';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const getChatHistoryKey = (userId: string, blogId: string) => `chatHistory_${userId}_${blogId}`;
const CHAT_LIMIT = 20;

export const useChat = (blogContent: string, blogTitle: string, userId: string | null, blogId: string) => {
  const chatHistoryKey = userId ? getChatHistoryKey(userId, blogId) : null;
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(chatHistoryKey || '', []);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const stripHtmlTags = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const sendMessage = async () => {
    if (!userInput.trim() || !userId || messages.length >= CHAT_LIMIT) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/chat`,
        { blogContent, userQuery: userInput, chatHistory: messages, blogTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAssistantMessage: ChatMessage = { role: 'assistant', content: stripHtmlTags(response.data.message) };
      setMessages((prevMessages) => [...prevMessages, newUserMessage, newAssistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: ChatMessage = { role: 'assistant', content: 'Sorry, an error occurred.' };
      setMessages((prevMessages) => [...prevMessages, newUserMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    if (chatHistoryKey) {
      localStorage.removeItem(chatHistoryKey);
    }
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
