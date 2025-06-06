export enum ChatType {
  default = 'default',
  private = 'private',
  channel = 'channel',
  thread = 'thread',
  self = 'self',
}

export enum MessageType {
  default = 'default',
  own = 'own',
  other = 'other',
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
  id?: string;
}

export interface Channels {
  id: string;
  channelCreatorId: string;
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

export interface UserDoc<T> {
  id: string;
  data: T;
}
export type ElementOf<K extends keyof UserData> = UserData[K] extends Array<
  infer U
>
  ? U
  : never;
export type CollectionResult<K extends keyof UserData> = {
  collection: K;
  // Jetzt docs: UserDoc<Element>[] – also z.B. UserDoc<ChannelsTest>[]
  docs: UserDoc<ElementOf<K>>[];
};

export interface UserData {
  channels: Array<ChannelsTest>;
  privateChats: Array<PrivateChat>;
  threads: Array<Threads>;
  messages: Array<Message>;
}

export interface Message {
  channelId: string;
  message: string;
  timestamp: string;
  userIds: Array<string>;
  creatorId: string;
  creatorAvatarId: number;
  creatorName: string;
  isThreadMessage: boolean;
  hasAThread: boolean,
  messageId: string;
  privateChatId: string;
  threadId: string;
}

export interface ChannelsTest {
  channelName: string;
  description: string;
  userIds: Array<string>;
}

export interface ChannelWithId {
  id: string;
  data: ChannelsTest; // Oder ein spezifischerer Typ für Ihre Channel-Daten
}

export interface PrivateChat {
  test: string;
  userIds: Array<string>;
}

export interface Threads {
  userIds: Array<string>;
}

export interface ThreadState {
  isOpen: boolean;
  currentThreadId: string | null;
  currentChannelId: string | null;
}

export enum EmojiFnRegulator {
  addReaction = 'addReaction',
  addEmojiToText = 'addEmojiToText'
}

export enum ChatInputType {
  fromThread = 'fromThread',
  fromMain = 'fromMain'
}
