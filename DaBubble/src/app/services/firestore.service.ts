import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
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

  ngOnInit() {}

  /**
   * this function returns the specific collection-reference of the firestore database.
   *
   * @returns collection-reference
   */
  getCollectionRef(collectionKey: string) {
    return collection(this.firestore, `${collectionKey}`);
  }

  /**
   *
   * @param collectionKey the name/key of the collection
   * @returns the collection itself. it contains a list of documents.
   */
  getCollectionData(collectionKey: string) {
    return collectionData(this.getCollectionRef(collectionKey));
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
