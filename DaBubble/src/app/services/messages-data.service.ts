import { Injectable, signal, inject, effect } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Firestore, collection, where, query } from '@angular/fire/firestore';
import { getDocs, onSnapshot } from 'firebase/firestore';
import {
  Message,
  UserData,
  CollectionResult,
  ElementOf,
  UserDoc,
  Threads,
  ChannelsTest,
  PrivateChat,
  ChatMessaggeEmoji,
  MergedMessage
} from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class MessagesDataService {

  private firestore: Firestore = inject(Firestore);
  private firestoreService = inject(FirestoreService);
  private _currentThreadId = signal<number>(0);
  private unsubscribeMsgs: (() => void) | null = null;
  private unsubscribeEmojis: (() => void) | null = null;
  private _messages = signal<Message[]>([]);
  private _emojis = signal<ChatMessaggeEmoji[]>([]);
  public readonly messages = this._messages.asReadonly();
  public _mergedMessages = signal<Array<MergedMessage>>([])
  private collections: Array<keyof UserData> = [
    'channels',
    'privateChats',
    'threads',
    'messages',
  ];

  constructor() {
    effect(() => {
      let emojis: Array<ChatMessaggeEmoji> = this._emojis();
     
        this.mergeEmojisWithMessages(emojis);
        console.log('hier sind die neuen messages: ---> ', this._mergedMessages());
     
    })
  }

mergeEmojisWithMessages(emojis: Array<ChatMessaggeEmoji>) {
  const messages = this._messages();
  const emojiMap = this.generateEmojiObjectReadyToMerge(emojis);

  const mergedMessages = messages.map(message => {
    const messageEmojis = emojiMap![message.messageId] || [];

    // Emojis mit gleichem emoji-Wert gruppieren
    const groupedEmojis = Object.values(
      messageEmojis.reduce((groups, emoji) => {
        const key = emoji.emoji; // z.B. "👍"
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(emoji);
        return groups;
      }, {} as Record<string, ChatMessaggeEmoji[]>)
    );

    return {
      ...message,
      emojis: groupedEmojis
    };
  });

  this._mergedMessages.set(mergedMessages);
}

  generateEmojiObjectReadyToMerge(emojis: Array<ChatMessaggeEmoji>) {
    return emojis.reduce((endObject, emoji: ChatMessaggeEmoji) => {
      if (!endObject[emoji.messageId]) {
        endObject[emoji.messageId] = [];
      }
      endObject[emoji.messageId].push(emoji);
      return endObject;
    }, {} as Record<string, ChatMessaggeEmoji[]>);
  }

  setCurrentThreadId(threadId: number) {
    this._currentThreadId.set(threadId);
    console.log('current thread:', this._currentThreadId());
  }

  getCurrentThreadId() {
    return this._currentThreadId();
  }

  /**
   * subscribed messages assing it to userId
   *
   * @param userId
   */
  subscribeToMessages(userId: string): void {
    this.unsubscribeMsgs = onSnapshot(this.query(userId, 'messages'), (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data() as Message);
      this._messages.set(messages);
      console.log('messages subscribed:', messages);
    });
  }

  /**
 * subscribed emojis assing it to userId
 *
 * @param userId
 */
  subscribeToEmojis(userId: string): void {
    this.unsubscribeEmojis = onSnapshot(this.query(userId, 'emojis'), (snapshot) => {
      const emojis = snapshot.docs.map((doc) => doc.data() as ChatMessaggeEmoji);
      this._emojis.set(emojis);
      console.log('Emojis subscribed -----> : ', emojis);
    });
  }



  /**
   * @param userId user id of currentuser
   * 
   * @returns a query wich is used to filter onSnapshot
   */
  query(userId: string, category: string) { //category either messages or emojis
    const q = query(
      collection(this.firestoreService.firestore, `${category}`),
      where('userIds', 'array-contains', userId)
    );

    return q;
  }

  /**
   * close the message observer
   */
  unsubscribeFromMessages(): void {
    this.unsubscribeMsgs?.();
  }

  /**
   * close the emojis observer
   */
  unsubscribeFromEmojis(): void {
    this.unsubscribeEmojis?.();
  }

  /**
   * Fetches all relevant user collections and combines them into a single user data object.
   *
   * @async
   * @function getUserData
   * @returns {Promise<Record<string, Array<{ id: string, data: any }>>>}
   * Resolves to an object where each key is a collection name and the value is an array of documents
   * (each with `id` and `data`) belonging to the current user.
   */

  async getUserData() {
    let results = await this.getAllUserCollections();
    console.log(
      'hier werden die sortierten results aufgelistet mit where',
      results
    );
    let userData = await this.createUserObject(results);
    return userData;
  }

  /**
   * Retrieves all user-specific Firestore collections and returns them as typed results.
   *
   * For each collection name in `this.collections`, queries Firestore for documents
   * where the `userIds` array contains the current user’s ID. Maps each fetched
   * document snapshot to an object containing its `id` and typed `data`.
   *
   * @async
   * @function
   * @returns {Promise<Array<CollectionResult<keyof UserData>>>}
   *   A promise resolving to an array of CollectionResult entries. Each entry
   *   has:
   *   - `collection`: the key of the UserData property (`'channels' | 'privateChats' | 'threads' | 'messages'`)
   *   - `docs`: an array of UserDoc items, each with:
   *       - `id`: the Firestore document ID
   *       - `data`: the document’s contents cast to the element type of that collection
   */

  async getAllUserCollections(): Promise<CollectionResult<keyof UserData>[]> {
    const userId = localStorage.getItem('id')!;
    const promises = this.collections.map(async (colName) => {
      const snap = await getDocs(
        query(
          collection(this.firestore, colName),
          where('userIds', 'array-contains', userId)
        )
      );
      const docs = snap.docs.map((docSnap) => ({
        id: docSnap.id,
        // ElementOf<'channels'> = ChannelsTest usw.
        data: docSnap.data() as ElementOf<typeof colName>,
      }));
      return {
        collection: colName,
        docs,
      } as CollectionResult<typeof colName>;
    });
    return Promise.all(promises);
  }

  /**
   * Transforms an array of collection query results into a consolidated UserData object.
   *
   * Iterates over each CollectionResult entry, discriminates by its `collection`
   * key, and maps the contained documents into the corresponding array in the
   * returned UserData.
   *
   * @param {Array<CollectionResult<keyof UserData>>} results
   *   An array of query results, each indicating which UserData collection
   *   it represents (`"channels"`, `"privateChats"`, `"threads"`, or `"messages"`)
   *   along with the fetched documents.
   *
   * @returns {Promise<UserData>}
   *   A promise that resolves to a UserData object where each property
   *   (`channels`, `privateChats`, `threads`, `messages`) contains the
   *   mapped document data for that collection.
   */
  async createUserObject(results: CollectionResult<keyof UserData>[]): Promise<UserData> {

    const userData: UserData = {
      channels: [],
      privateChats: [],
      threads: [],
      messages: [],
    };
    for (const { collection, docs } of results) {
      switch (collection) {
        case 'channels':
          // Überzeuge TS per Assertion, dass docs hier ChannelsDocs sind
          userData.channels = (docs as UserDoc<ChannelsTest>[]).map(
            (d) => d.data
          );
          break;
        case 'privateChats':
          userData.privateChats = (docs as UserDoc<PrivateChat>[]).map(
            (d) => d.data
          );
          break;
        case 'threads':
          userData.threads = (docs as UserDoc<Threads>[]).map((d) => d.data);
          break;
        case 'messages':
          userData.messages = (docs as UserDoc<Message>[]).map((d) => d.data);
          break;
      }
    }
    return userData;
  }
}
