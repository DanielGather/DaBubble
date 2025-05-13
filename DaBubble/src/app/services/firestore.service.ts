import { Injectable, inject } from '@angular/core';
import { Channels } from '../types/types';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  docData,
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor() {}

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
}
