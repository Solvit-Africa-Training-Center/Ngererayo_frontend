import { useState, useCallback } from 'react';
import { ChatListItem } from '../type/messaging';
import { sampleChats } from '../utilis/messageHelpers';

export const useMessaging = () => {
  const [chats, setChats] = useState<ChatListItem[]>(sampleChats);
  const [activeChat, setActiveChat] = useState<string>('');

  const selectChat = useCallback((chatId: string) => {
    setActiveChat(chatId);
  }, []);

  const sendMessage = useCallback((chatId: string, message: string) => {
    console.log(`Sending message to chat ${chatId}:`, message);
  }, []);

  const createChat = useCallback((participantName: string, productId?: string) => {
    const newChat: ChatListItem = {
      id: Date.now().toString(),
      participantName,
      initials: participantName.split(' ').map(n => n[0]).join('').toUpperCase(),
      avatarColor: '#22c55e',
      lastMessage: 'Chat started',
      timestamp: 'now',
      status: 'active'
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    
    return newChat.id;
  }, []);

  return {
    chats,
    activeChat,
    selectChat,
    sendMessage,
    createChat
  };
};