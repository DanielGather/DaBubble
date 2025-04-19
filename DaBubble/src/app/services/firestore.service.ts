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
    const roomsSnapshot = await getDocs(collection(this.firestore, 'rooms'));
    const matchingDoc = roomsSnapshot.docs.find(
      (doc, index) => doc.data()['userIds'][index] === userId
    );
    if (matchingDoc) {
      let subCollectionArray = await this.getSubCollection(matchingDoc);
      return subCollectionArray;
    } else {
      console.log('No room found for userId', userId);
      return;
    }
  }

  async getSubCollection(matchingDoc: any) {
    console.log('Found Document', matchingDoc.id, matchingDoc.data());
    let Array: any[] = [];
    const querySnapshot = await getDocs(
      collection(this.firestore, 'rooms', matchingDoc.id, 'messages')
    );
    querySnapshot.forEach((doc) => {
      Array.push(doc.data());
    });
    return Array;
  }
}
