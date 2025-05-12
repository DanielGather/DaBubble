import { Injectable, inject } from '@angular/core';
import { Channels } from '../types/types';
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
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  /**
   * firestore service
   */
  firestore: Firestore = inject(Firestore);

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

  collections: string[] = ['channels', 'privateChats', 'threads', 'messages'];

  constructor() {}

  /**
   * this function returns the specific collection-reference of the firestore database.
   *
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
   * create a new collectionm from what?
   * @param collectionName
   * @param objekt
   * create a new collection from what?
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
 * Queries Firestore for each collection that contains the current user’s ID,
 * and returns an array of results.
 *
 * @async
 * @function getAllCollections
 * @returns {Promise<Array<{collection: string,docs: Array<{ id: string, data: any }>}>>}  
 * Resolves to an array where each element represents one collection:
 *  - `collection`: the name of the collection
 *  - `docs`: an array of document objects with `id` and `data` properties
 */

  async getAllUserCollections() {
    let userId = localStorage.getItem('id');
    console.log('AllUserCollections: ' + userId)
    const promises = this.collections.map(async (colName) => {
      const q = query(
        collection(this.firestore, colName),
        where('userIds', 'array-contains', userId),
        
        
      );
      const snapshot = await getDocs(q);
      return {
        collection: colName,
        docs: snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
      };
    });
    const results = await Promise.all(promises);
    console.log('Das sind meine Results', results);
    return results;
  }

  /**
 * Transforms an array of collection results into a single user data object.
 *
 * @async
 * @function createUserObject
 * @param {Array<{collection: string, docs: Array<{ id: string, data: any }>}>} results
 *  - The array of collection query results.
 * @returns {Promise<Record<string, Array<{ id: string, data: any }>>>}
 * Resolves to an object mapping each collection name to its array of documents.
 */

  async createUserObject(results: CollectionResult[]) {
    results.forEach(({ collection, docs }) => {
      console.log(`Ergebnisse aus Collection "${collection}":`);
      docs.forEach(({ id, data }) => {
        console.log(` • ${collection}/${id} →`, data);
      });
    });
    return results.reduce((acc, { collection, docs }) => {
      acc[collection] = docs;
      return acc;
    }, {} as Record<string, Array<{ id: string; data: any }>>);
  }
}
