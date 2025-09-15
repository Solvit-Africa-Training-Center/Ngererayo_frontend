export interface User {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  status: 'active' | 'offline';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  attachments?: Attachment[];
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  productContext?: {
    productId: string;
    productName: string;
    productImage: string;
  };
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface ChatListItem {
  id: string;
  participantName: string;
  participantAvatar?: string;
  initials: string;
  avatarColor: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'offline';
  unreadCount?: number;
}