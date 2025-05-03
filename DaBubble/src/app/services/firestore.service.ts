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
} from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { DocumentReference, getDoc } from 'firebase/firestore';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  /**
   * firestore service
   */
  firestore: Firestore = inject(Firestore);
  readonly channelsList$: Observable<Channels[]> = this.getCollectionData(
    'channels'
  ) as Observable<Channels[]>;

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

  async addDoc(collectionName: string, objekt: {}) {
    const collRef = collection(this.firestore, collectionName);
    const docRef = await addDoc(collRef, objekt);
    console.log('Neues Dokument angelegt mit ID', docRef.id);
  }

  async getSingleCollection() {
    const docRef = doc(this.firestore, 'channels', 'shbkYb7CQImUdRq9nCaJ');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      console.log('Document data:', docSnap.id);
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  async getSubCollection() {
    const querySnapshot = await getDocs(
      collection(
        this.firestore,
        'channels',
        'shbkYb7CQImUdRq9nCaJ',
        'messages',
        'XmcsHSJL9yfCm3S8UZzP',
        'threads'
      )
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }
}
