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
  thread: Array<ChatMessage>;
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
  userId?: string;
}

export interface Channels {
  id: string;
  channelName: string;
  description: string;
  userIds: Array<string>;
}

export interface FoldItemState {
  rotation: number;
  isRotated: boolean;
  isFolded: boolean;
}

export type FoldKey = 'channel' | 'contacts';
export type FoldState = Record<FoldKey, FoldItemState>;

export interface UserDoc {
  id: string;
  data: any;
}

export interface CollectionResult {
  collection: string;
  docs: UserDoc[];
}
