export enum ChatType {
  default = 'default',
  private = 'private',
  channel = 'channel',
  self = 'self',
}

export enum MessageType {
  default = 'default',
  own = 'own',
  other = 'other',
}

export interface ChatMessage {
  message: string;
  name: string;
  timestamp: string;
  userId: string;
  emojis: Array<ChatMessaggeEmoji>;
}

export interface ChatMessaggeEmoji {
  emojiId: string;
  userIdCount: Array<string>;
}

export interface AppUser {
  avatarId: number;
  email: string;
  firstName: string;
  lastName: string;
  online: boolean;
  userId: string;
}
