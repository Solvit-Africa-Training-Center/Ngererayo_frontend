import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, timestamp, isOwn, status }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] px-4 py-2 rounded-xl ${
        isOwn 
          ? 'bg-green-500 text-white rounded-br-sm' 
          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
      }`}>
        <p className="text-sm">{content}</p>
        <div className={`flex items-center justify-end mt-1 gap-1 ${
          isOwn ? 'text-green-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">{timestamp}</span>
          {isOwn && (
            <div className="flex items-center">
              {status === 'sent' && <Check size={12} />}
              {status === 'delivered' && <CheckCheck size={12} />}
              {status === 'read' && <CheckCheck size={12} className="text-blue-300" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;