import { Injectable, inject, signal } from '@angular/core';
import { FirestoreService } from './firestore.service';
import {
  AppUser,
  MessageType,
  CollectionResult,
  ElementOf,
  UserDoc,
  ChannelsTest,
  PrivateChat,
  Threads,
} from '../types/types';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCredential } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { UserData } from '../types/types';
import { Message } from '../types/types';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  where,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {
    console.log('show me if there is an id' + this.usersList$);
  }

  firestoreService: FirestoreService = inject(FirestoreService);
  firestore: Firestore = inject(Firestore);
  currentUserId: string | null = null;
  userObject: AppUser | null = null;
  userDataObject!: UserData;
  collections: Array<keyof UserData> = [
    'channels',
    'privateChats',
    'threads',
    'messages',
  ];

  /**
   * A behaviorsubject to manage the realtime data of the currentUser
   */
  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);

  /**
   * this variable is the unscribe mechanism of the snapShot wich will have the realtime connection of the currentUser information
   *
   * if a user would log out or change the login status, make sure you use userUnsubscribe() before logging in a new user.
   */
  private userUnsubscribe: (() => void) | null = null;

  private _messages = signal<Message[]>([]);
  public readonly messages = this._messages.asReadonly();
  private unsubscribeFn: (() => void) | null = null;

  // private _messagesSubject = new BehaviorSubject<Message[]>([]);
  // messages$ = this._messagesSubject.asObservable();

  /**
   * this variable observes the snapShot of the user info doc
   */
  readonly currentUser$ = this.currentUserSubject.asObservable();

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;

  /**
   * A help
   * @param user
   */
  setCurrentUser(user: AppUser | null) {
    this.currentUserSubject.next(user);
    console.log('set current user to: ', user);
  }

  /**
   * Subscribes the specific user-doc in realtime
   * @param userId
   */
  observeCurrentUser(userId: string) {
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
    }

    const userDocRef = this.firestoreService.getSingleDocRef('users', userId);

    this.userUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const user = {
          ...(docSnap.data() as AppUser),
          userId: docSnap.id,
        };

        console.log('user.userId:', user.userId);
        this.setCurrentUser(user);
      } else {
        this.setCurrentUser(null);
      }
    });
  }

  /**
   * Unsubs the realtime data of currentUser.
   * Call this function after logout or user change.
   */
  clearCurrentUser() {
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
      this.userUnsubscribe = null;
    }
    this.setCurrentUser(null);
    this.currentUserId = null;
  }

  // subscribeToMessages(userId: string): () => void {
  //   const q = query(
  //     collection(this.firestoreService.firestore, 'messages'),
  //     where('userIds', 'array-contains', userId)
  //   );

  //   return onSnapshot(q, (snapshot) => {
  //     const docs = snapshot.docs.map((docSnap) => ({
  //       id: docSnap.id,
  //       data: docSnap.data() as Message,
  //     }));
  //     this.userDataObject.messages = docs.map((d) => d.data);
  //     console.log('Live messages updated:', this.userDataObject.messages);
  //     this._messagesSubject.next(this.userDataObject.messages);
  //   });
  // }

  subscribeToMessages(userId: string): void {
    const q = query(
      collection(this.firestoreService.firestore, 'messages'),
      where('userIds', 'array-contains', userId)
    );

    this.unsubscribeFn = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data() as Message);
      this._messages.set(messages);
      console.log('Live messages:', messages);
    });
  }

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
