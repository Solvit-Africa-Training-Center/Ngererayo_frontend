import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, Send, Search } from 'lucide-react';
import { Chat, Message } from '../../types/seller';

const SellerChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const sampleChats = [
    {
      id: '1',
      buyerId: 'buyer1',
      buyerName: 'John Doe',
      productId: '1',
      productName: 'Maize',
      lastMessage: 'Is this still available?',
      lastMessageTime: new Date(),
      unreadCount: 2,
      status: 'active' as const
    },
    {
      id: '2',
      buyerId: 'buyer2',
      buyerName: 'Jane Smith',
      productId: '2',
      productName: 'Tomatoes',
      lastMessage: 'Can you deliver to Nyamirambo?',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 1,
      status: 'active' as const
    },
    {
      id: '3',
      buyerId: 'buyer3',
      buyerName: 'Peter Uwimana',
      productId: '3',
      productName: 'Yams',
      lastMessage: 'What is the minimum order quantity?',
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 0,
      status: 'active' as const
    }
  ];

  const sampleMessages: Message[] = [
    {
      id: '1',
      chatId: '1',
      senderId: 'buyer1',
      senderType: 'buyer',
      content: 'Hi, I\'m interested in your maize. Is it still available?',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true
    },
    {
      id: '2',
      chatId: '1',
      senderId: '1',
      senderType: 'seller',
      content: 'Yes, it\'s still available. How much do you need?',
      timestamp: new Date(Date.now() - 3000000),
      isRead: true
    },
    {
      id: '3',
      chatId: '1',
      senderId: 'buyer1',
      senderType: 'buyer',
      content: 'Is this still available?',
      timestamp: new Date(),
      isRead: false
    }
  ];

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId && chats.length > 0) {
      const productChat = chats.find(chat => chat.productId === productId);
      if (productChat) {
        setSelectedChat(productChat);
        loadMessages(productChat.id);
      }
    }
  }, [chats, searchParams]);

  const loadChats = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setChats(sampleChats);
    setLoading(false);
  };

  const loadMessages = async (chatId: string) => {
    const chatMessages = sampleMessages.filter(msg => msg.chatId === chatId);
    setMessages(chatMessages);
    
    // Mark messages as read
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      chatId: selectedChat.id,
      senderId: '1',
      senderType: 'seller',
      content: newMessage,
      timestamp: new Date(),
      isRead: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Update chat last message
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, lastMessage: newMessage, lastMessageTime: new Date() }
          : chat
      )
    );
  };

  const filteredChats = chats.filter(chat =>
    chat.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow h-[600px] flex">
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-full">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat);
                    loadMessages(chat.id);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === chat.id ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900">{chat.buyerName}</h3>
                    <span className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{chat.productName}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate flex-1">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-medium text-gray-900">{selectedChat.buyerName}</h3>
                  <p className="text-sm text-gray-600">Regarding: {selectedChat.productName}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderType === 'seller' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderType === 'seller'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderType === 'seller' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerChats;