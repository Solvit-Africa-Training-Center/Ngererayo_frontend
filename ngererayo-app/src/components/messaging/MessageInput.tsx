import React, { useState } from 'react';
import { Paperclip, Lock, Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onAttachFile: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onAttachFile }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <button
          type="button"
          onClick={onAttachFile}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Paperclip size={20} />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your Message"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Lock size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;