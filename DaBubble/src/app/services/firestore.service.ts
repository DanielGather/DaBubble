import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
Observable

@Injectable({
  providedIn: 'root'
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
  getCollectionRef(collectionKey:string) {
    return collection(this.firestore,`${collectionKey}`);
  }

  /**
   * 
   * @param collectionKey the name/key of the collection
   * @returns the collection itself. it contains a list of documents.
   */
  getCollectionData(collectionKey:string) {
    return collectionData(this.getCollectionRef(collectionKey));
  }
  

}
