import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { ChatListItem } from '../../type/messaging';
import { sampleMessages } from '../../utilis/messageHelpers';

interface ConversationAreaProps {
  activeChat: ChatListItem | null;
  onSendMessage: (message: string) => void;
  onAttachFile: () => void;
  productData?: any;
}

const ConversationArea: React.FC<ConversationAreaProps> = ({ 
  activeChat, 
  onSendMessage, 
  onAttachFile,
  productData 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sampleMessages]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader
        participantName={activeChat.participantName}
        initials={activeChat.initials}
        avatarColor={activeChat.avatarColor}
        status={activeChat.status}
        onVoiceCall={() => console.log('Voice call')}
        onVideoCall={() => console.log('Video call')}
        onMoreOptions={() => console.log('More options')}
      />
      
      {productData && (
        <div className="border-b bg-white p-4">
          <div className="flex gap-4">
            <img 
              src={`https://degreat1.pythonanywhere.com${productData.product_image}`}
              alt={productData.product_name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{productData.product_name}</h3>
              <p className="text-lg font-bold text-green-600">RWF {productData.price}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{productData.description}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {sampleMessages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isOwn={message.senderId === 'buyer'}
            status={message.status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput
        onSendMessage={onSendMessage}
        onAttachFile={onAttachFile}
      />
    </div>
  );
};

export default ConversationArea;