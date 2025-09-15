import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Bell, User } from 'lucide-react';
import RecentChats from './RecentChats';
import ConversationArea from './ConversationArea';
import { sampleChats } from '../../utilis/messageHelpers';
import { ChatListItem } from '../../type/messaging';
import axios from 'axios';

interface MessagingPageProps {
  productId?: string;
  sellerId?: string;
}

const MessagingPage: React.FC<MessagingPageProps> = () => {
  const { chatId, productId, sellerId } = useParams();
  const [activeChat, setActiveChat] = useState<string>(chatId || sampleChats[0]?.id || '');
  const [chats] = useState<ChatListItem[]>(sampleChats);
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `https://degreat1.pythonanywhere.com/market/product/${productId}/`
          );
          setProductData(response.data);
        } catch (err) {
          console.error('Error fetching product:', err);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const selectedChat = chats.find(chat => chat.id === activeChat) || null;

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  const handleAttachFile = () => {
    console.log('Attach file');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌾</span>
                </div>
                <span className="text-xl font-bold text-green-600">NGERERAYO</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Home</a>
              <a href="/marketplace" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Marketplace</a>
              <a href="/dashboard" className="text-green-600 px-3 py-2 text-sm font-medium">Dashboard</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart size={20} />
              </button>
              <div className="flex items-center gap-2">
                <User size={20} className="text-gray-600" />
                <span className="text-sm text-gray-700">Jean Baptiste</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        <RecentChats
          chats={chats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
        />
        <ConversationArea
          activeChat={selectedChat}
          onSendMessage={handleSendMessage}
          onAttachFile={handleAttachFile}
          productData={productData}
        />
      </div>
    </div>
  );
};

export default MessagingPage;