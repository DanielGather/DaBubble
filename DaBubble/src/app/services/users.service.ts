import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppUser } from '../types/types';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCredential } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  firestoreService: FirestoreService = inject(FirestoreService);
  currentUserId: string | null = null;
  userObject: AppUser | null = null;

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

  /**
   * this variable observes the snapShot of the user info doc
   */
  readonly currentUser$ = this.currentUserSubject.asObservable();

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;

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
}
