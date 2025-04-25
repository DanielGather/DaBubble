import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  doc,
  updateDoc,
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
  channelsArray: string[] = ['Entwicklerteam'];

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

  /**
   * Fetches all messages from the `messages` subcollection of the room
   * that contains the specified user (`userId`).
   *
   * The function first queries the `rooms` collection to find a room
   * whose `userIds` array includes the given `userId`. If a matching
   * document is found, it retrieves all messages from the
   * `rooms/{roomId}/messages` subcollection and returns them as an array.
   *
   * @async
   * @function fetchRoomsAndMessages
   * @param {number} userId - The ID of the user to search for in rooms.
   * @returns {Promise<any[]|undefined>} A promise that resolves to an array
   *   of message data objects (`any[]`), or `undefined` if no room containing
   *   the userId is found.
   */

  async fetchUserMessages(userId: number) {
    const roomsSnapshot = await getDocs(collection(this.firestore, 'channels'));
    const matchingDoc = roomsSnapshot.docs.filter((doc, index) =>
      doc.data()['userIds'][index].includes(userId)
    );
    if (matchingDoc) {
      let subCollectionArray = await this.getSubCollection(matchingDoc);
      return subCollectionArray;
    } else {
      console.log('No channels found for userId', userId);
      return;
    }
  }

  async getSubCollection(matchingDoc: any) {
    console.log('Found Document', matchingDoc.id, matchingDoc.data());
    let Array: any[] = [];
    const querySnapshot = await getDocs(
      collection(this.firestore, 'channels', matchingDoc.id, 'messages')
    );
    querySnapshot.forEach((doc) => {
      Array.push(doc.data());
      console.log(doc.id);
    });
    return Array;
  }
}
