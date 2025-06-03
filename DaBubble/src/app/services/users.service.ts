import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppUser } from '../types/types';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { onSnapshot } from 'firebase/firestore';
import { UserData } from '../types/types';
import { Firestore } from '@angular/fire/firestore';
import { ChannelsService } from './channels.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  firestore: Firestore = inject(Firestore);
  firestoreService: FirestoreService = inject(FirestoreService);
  channelsService = inject(ChannelsService);
  currentUserId: string | null = null;
  userInformation: AppUser | null = null;
  userChatDataObject!: UserData;

  /**
   * A behaviorsubject to manage the realtime data of the currentUser
   */
  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);

  /**
   * this variable observes the snapShot of the user info doc
   */
  readonly currentUser$ = this.currentUserSubject.asObservable();

  /**
   * this variable is the unscribe mechanism of the snapShot wich will have the realtime connection of the currentUser information
   *
   * if a user would log out or change the login status, make sure you use userUnsubscribe() before logging in a new user.
   */
  private userUnsubscribe: (() => void) | null = null;

  // private _messagesSubject = new BehaviorSubject<Message[]>([]);
  // messages$ = this._messagesSubject.asObservable();

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;

  /**
   * A help function to set the data of the currentUser into the currentUserSubject.
   * The observable to subscribe is called: currentUser$
   *
   * @param user
   */
  setCurrentUser(user: AppUser | null) {
    this.currentUserSubject.next(user);
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

  /**
   * get user from firebase and sort it
   * @returns
   */
  getSortedUser(): Observable<AppUser[]> {
    return this.usersList$.pipe(
      map((list) =>
        [...list].sort((a, b) =>
          a.firstName.localeCompare(b.firstName, 'de', { sensitivity: 'base' })
        )
      )
    );
  }

  /**
   * get userId from channel
   * @param channelId
   * @returns
   */
  getUserIdsForCurrentChannel$(
    channelId: string
  ): Observable<string[]> {
    return this.channelsService
      .getChannelById$(channelId)
      .pipe(map((channel) => channel.userIds));
  }
}
