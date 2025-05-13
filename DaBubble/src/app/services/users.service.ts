import { Injectable, inject, signal } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppUser, MessageType } from '../types/types';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCredential } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { UserData } from '../types/types';
import { Message } from '../types/types';
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
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  firestoreService: FirestoreService = inject(FirestoreService);
  currentUserId: string | null = null;
  userObject: AppUser | null = null;
  userDataObject!: UserData;

  /**
   * A behaviorsubject to manage the realtime data of the currentUser
   */
  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);

  /**
   * this variable is the unscribe mechanism of the snapShot wich will have the realtime connection of the currentUser information
   *
   * if a user would log out or change the login status, make sure you use userUnsubscribe() before logging in a new user.
   */
  private userUnsubscribe: (() => void) | null = null;

  private _messages = signal<Message[]>([]);
  public readonly messages = this._messages.asReadonly();
  private unsubscribeFn: (() => void) | null = null;

  // private _messagesSubject = new BehaviorSubject<Message[]>([]);
  // messages$ = this._messagesSubject.asObservable();

  /**
   * this variable observes the snapShot of the user info doc
   */
  readonly currentUser$ = this.currentUserSubject.asObservable();

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;

  constructor() {
    console.log('show me if there is an id' + this.usersList$);
  }

  /**
   * A help
   * @param user
   */
  setCurrentUser(user: AppUser | null) {
    this.currentUserSubject.next(user);
    console.log('set current user to: ', user);
  }

  /**
   * Subscribes the specific user-doc in realtime
   * @param userId
   */
  observeCurrentUser(userId: string) {
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
    }

    const userDocRef = this.firestoreService.getSingleDocRef('users', userId);

    this.userUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const user = {
          ...(docSnap.data() as AppUser),
          userId: docSnap.id,
        };

        console.log('user.userId:', user.userId);
        this.setCurrentUser(user);
      } else {
        this.setCurrentUser(null);
      }
    });
  }

  /**
   * Unsubs the realtime data of currentUser.
   * Call this function after logout or user change.
   */
  clearCurrentUser() {
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
      this.userUnsubscribe = null;
    }
    this.setCurrentUser(null);
    this.currentUserId = null;
  }

  // subscribeToMessages(userId: string): () => void {
  //   const q = query(
  //     collection(this.firestoreService.firestore, 'messages'),
  //     where('userIds', 'array-contains', userId)
  //   );

  //   return onSnapshot(q, (snapshot) => {
  //     const docs = snapshot.docs.map((docSnap) => ({
  //       id: docSnap.id,
  //       data: docSnap.data() as Message,
  //     }));
  //     this.userDataObject.messages = docs.map((d) => d.data);
  //     console.log('Live messages updated:', this.userDataObject.messages);
  //     this._messagesSubject.next(this.userDataObject.messages);
  //   });
  // }

  subscribeToMessages(userId: string): void {
    const q = query(
      collection(this.firestoreService.firestore, 'messages'),
      where('userIds', 'array-contains', userId)
    );

    this.unsubscribeFn = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data() as Message);
      this._messages.set(messages);
      console.log('Live messages:', messages);
    });
  }

  unsubscribeFromMessages(): void {
    this.unsubscribeFn?.();
  }
}
