import { Injectable, inject } from '@angular/core';
import { Channels, UserData } from '../types/types';
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
import { getDoc } from 'firebase/firestore';
import { Observable, shareReplay } from 'rxjs';
import { CollectionResult } from '../types/types';
import { UserDoc } from '../types/types';

import { ChannelsTest } from '../types/types';
import { Threads } from '../types/types';
import { Message } from '../types/types';
import { PrivateChat } from '../types/types';
import { ElementOf } from '../types/types';
import { onSnapshot } from 'firebase/firestore';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  /**
   * firestore service
   */
  firestore: Firestore = inject(Firestore);
  // usersService: UsersService = inject(UsersService);

  /**
   * Observable that loads all documents from the Firestore 'channels' collection at application start.
   * The data is cached using `shareReplay(1)`, so multiple subscribers receive the same data
   * without triggering additional Firestore reads.
   *
   * NOTE: Since this property is marked as `readonly`, it cannot be reassigned later.
   * This is suitable only if the list of channels is static or should only be loaded once.
   */
  readonly channelsList$: Observable<Channels[]> = this.getCollectionData(
    'channels'
  ) as Observable<Channels[]>;

  collections: Array<keyof UserData> = [
    'channels',
    'privateChats',
    'threads',
    'messages',
  ];

  constructor() {}

  /**
   * this function returns the specific collection-reference of the firestore database.
   * it is needed to get collection data
   * @returns collection-reference
   */
  getCollectionRef(collectionKey: string) {
    return collection(this.firestore, `${collectionKey}`);
  }

  /**
   * this function returns the key specific collection.
   * it is used to get the collection data.
   * it also returns every id from the collectionData
   *
   * @param collectionKey the name/key of the collection
   * @returns the collection itself. it contains a list of documents.
   */
  getCollectionData(collectionKey: string) {
    return collectionData(this.getCollectionRef(collectionKey), {
      idField: 'id',
    }).pipe(shareReplay(1));
  }

  /**
   * this function is used to get a single document reference.
   *
   * @param collectionId collection id to tell the function wich collection should be fetched the document from.
   * @param docId document id to tell the function wich document should be fetched.
   * @returns single document reference.
   */
  getSingleDocRef(collectionId: string, docId: string) {
    return doc(this.firestore, collectionId, docId);
  }

  /**
   * This function get a docsnap from a single document.
   * it is no datastream, it fetches the data only once.
   *
   * @param collectionId the id of the collection to search in
   * @param docId the id of the document
   * @returns
   */
  async getSingleDoc(collectionId: string, docId: string) {
    const docRef = this.getSingleDocRef(collectionId, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  /**
   * this function allows to update an exsisting document in a specific collection.
   *
   * @param collectionId collection id as a string
   * @param docId document id as a string
   * @param docObject the object wich will update the existing object in the document
   */
  async updateDoc(collectionId: string, docId: string, docObject: {}) {
    updateDoc(this.getSingleDocRef(collectionId, docId), docObject);
  }

  /**
   * create a new document
   * @param collectionName
   * @param objekt
   */
  async addDoc(collectionName: string, objekt: {}) {
    const collRef = collection(this.firestore, collectionName);
    const docRef = await addDoc(collRef, objekt);
    console.log('Neues Dokument angelegt mit ID', docRef.id);
  }

  /**
   * updates or create a new document
   * @param collectionName
   * @param docId
   * @param objekt
   */
  async setDoc(collectionName: string, docId: string, objekt: {}) {
    await setDoc(doc(this.firestore, collectionName, docId), objekt);
  }

  async getSingleCollection(collectionId: string, docId: string) {
    const docRef = this.getSingleDocRef(collectionId, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      console.log('Document data:', docSnap.id);
      return docSnap.data();
    } else {
      console.log('No such document!');
      return;
    }
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
