import React from 'react';
import { ChatListItem } from '../../type/messaging';

interface RecentChatsProps {
  chats: ChatListItem[];
  activeChat?: string;
  onChatSelect: (chatId: string) => void;
}

const RecentChats: React.FC<RecentChatsProps> = ({ chats, activeChat, onChatSelect }) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Recent Chats</h2>
      </div>
      
      <div className="overflow-y-auto h-full">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${
              activeChat === chat.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: chat.avatarColor }}
                >
                  {chat.initials}
                </div>
                {chat.status === 'active' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{chat.participantName}</h3>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unreadCount && (
                    <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {chat.status === 'active' ? 'Active now' : `${chat.timestamp}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;