import { ChatListItem } from '../type/messaging';

export const generateAvatarColor = (name: string): string => {
  const colors = [
    '#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', 
    '#ef4444', '#06b6d4', '#84cc16', '#f97316'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${weeks}w ago`;
};

export const sampleChats: ChatListItem[] = [
  {
    id: "1",
    participantName: "Green valley firms",
    initials: "GV",
    avatarColor: "#22c55e",
    lastMessage: "Thank you for your Question!",
    timestamp: "4h ago",
    status: "active",
    unreadCount: 2
  },
  {
    id: "2",
    participantName: "Agro Supply co.",
    initials: "AC",
    avatarColor: "#3b82f6",
    lastMessage: "Your order has been confirmed",
    timestamp: "1w ago",
    status: "offline"
  },
  {
    id: "3",
    participantName: "Firm Tools Direct",
    initials: "FT",
    avatarColor: "#8b5cf6",
    lastMessage: "The shipping will be in 3hrs.",
    timestamp: "1m ago",
    status: "offline"
  }
];

export const sampleMessages = [
  {
    id: "1",
    content: "Hello Thank you for your interest in our organic tomatoes seeds. How can I help you now?",
    timestamp: "10:30AM",
    senderId: "seller",
    status: "read" as const
  },
  {
    id: "2",
    content: "Hi, I was wondering about the germination rate of these seeds.",
    timestamp: "10:33AM",
    senderId: "buyer",
    status: "read" as const
  },
  {
    id: "3",
    content: "Our organic tomato seeds have 95% germination rate. They are perfect for both greenhouse and outdoor cultivation. Would you like to know about growing requirement?",
    timestamp: "10:35AM",
    senderId: "seller",
    status: "read" as const
  },
  {
    id: "4",
    content: "Thank you for your information.",
    timestamp: "10:40AM",
    senderId: "buyer",
    status: "delivered" as const
  }
];