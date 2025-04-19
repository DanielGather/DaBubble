import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { DocumentReference, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
Observable;

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  /**
   * firestore service
   */
  firestore: Firestore = inject(Firestore);

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
    return collectionData(this.getCollectionRef(collectionKey),{ idField: 'id' });
  }

  /**
   * this function is used to get a single document reference.
   * 
   * @param collectionId collection id to tell the function wich collection should be fetched the document from.
   * @param docId document id to tell the function wich document should be fetched.
   * @returns single document reference.
   */
  getSingleDocRef(collectionId:string, docId:string) {
    return doc(this.firestore, collectionId, docId);
  }

  /**
   * this function allows to update an exsisting document in a specific collection.
   * 
   * @param collectionId collection id as a string
   * @param docId document id as a string
   * @param docObject the object wich will update the existing object in the document
   */
  async updateDoc(collectionId:string, docId:string, docObject:{}) {
    updateDoc(this.getSingleDocRef(collectionId, docId), docObject);
  }

  async fetchUserMessages(userId: number) {
    const roomsSnapshot = await getDocs(collection(this.firestore, 'rooms'));
    const matchingDoc = roomsSnapshot.docs.find(
      (doc, index) => doc.data()['userIds'][index] === userId
    );
    if (matchingDoc) {
      console.log('Gefundes Dokument', matchingDoc.id, matchingDoc.data());
      let subCollectionArray: any[] = [];
      const querySnapshot = await getDocs(
        collection(this.firestore, 'rooms', matchingDoc.id, 'messages')
      );
      querySnapshot.forEach((doc) => {
        subCollectionArray.push(doc.data());
      });
      return subCollectionArray;
 
    } else {
      console.log('Kein Dokument mit dieser userId gefunden.');
      return;
    }
  }
}
