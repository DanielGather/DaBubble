import { Injectable, signal, inject } from '@angular/core';
import { ChatMessage } from '../types/types';
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
} from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class MessagesDataService {
  constructor() {}
  private firestore: Firestore = inject(Firestore);
  private firestoreService = inject(FirestoreService);
  private _currentThreadId = signal<number>(0);
  private unsubscribeFn: (() => void) | null = null;
  private _messages = signal<Message[]>([]);
  public readonly messages = this._messages.asReadonly();
  private collections: Array<keyof UserData> = [
    'channels',
    'privateChats',
    'threads',
    'messages',
  ];

  setCurrentThreadId(threadId: number) {
    this._currentThreadId.set(threadId);
    console.log('current thread:', this._currentThreadId());
  }

  getCurrentThreadId() {
    return this._currentThreadId();
  }

  /**
   * auslagern in message service
   * subscribed messages assing it to userId
   * @param userId
   */
  subscribeToMessages(userId: string): void {
    const q = query(
      collection(this.firestoreService.firestore, 'messages'),
      where('userIds', 'array-contains', userId)
    );

    this.unsubscribeFn = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data() as Message);
      this._messages.set(messages);
      console.log('messages subscribed:', messages);
    });
  }

  /**
   * close the message observer
   */
  unsubscribeFromMessages(): void {
    this.unsubscribeFn?.();
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
  async createUserObject(
    results: CollectionResult<keyof UserData>[]
  ): Promise<UserData> {
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
