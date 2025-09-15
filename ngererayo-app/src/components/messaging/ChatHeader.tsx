import React from 'react';
import { Phone, Video, MoreHorizontal } from 'lucide-react';

interface ChatHeaderProps {
  participantName: string;
  participantAvatar?: string;
  initials: string;
  avatarColor: string;
  status: 'active' | 'offline';
  onVoiceCall: () => void;
  onVideoCall: () => void;
  onMoreOptions: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  participantName,
  initials,
  avatarColor,
  status,
  onVoiceCall,
  onVideoCall,
  onMoreOptions
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{participantName}</h3>
          <p className="text-sm text-green-500">{status === 'active' ? 'Active now' : 'Offline'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onVoiceCall}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Phone size={20} className="text-gray-600" />
        </button>
        <button 
          onClick={onVideoCall}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Video size={20} className="text-gray-600" />
        </button>
        <button 
          onClick={onMoreOptions}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;