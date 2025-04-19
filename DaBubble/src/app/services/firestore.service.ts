import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
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

  ngOnInit() {
    let rooms = this.getCollectionRef('rooms');
    console.log(rooms);
  }

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

  async fetchRooms() {
    const querySnapshot = await getDocs(collection(this.firestore, 'rooms'));

    querySnapshot.forEach((doc) => {
      console.log('📄 ID:', doc.id);
      console.log('📦 Daten:', doc.data());
    });
  }

  async fetchRoomsAndMessages() {
    const roomsSnapshot = await getDocs(collection(this.firestore, 'rooms'));

    for (const roomDoc of roomsSnapshot.docs) {
      console.log('🛋️ Raum:', roomDoc.id, roomDoc.data());

      const messagesRef = collection(
        this.firestore,
        'rooms',
        roomDoc.id,
        'messages'
      );
      const messagesSnapshot = await getDocs(messagesRef);

      messagesSnapshot.forEach((messageDoc) => {
        console.log('   💬 Nachricht:', messageDoc.id, messageDoc.data());
      });
    }
  }
}
