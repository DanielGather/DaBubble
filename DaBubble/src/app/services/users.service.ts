import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppUser } from '../types/types';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  
  currentUserCredential:UserCredential|null = null;
  currentUserId:string|null = null;
  currentUser:AppUser|null = null;


  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();
  firestoreService: FirestoreService = inject(FirestoreService);

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;
  
  
  constructor() {}

  setCurrentUser(user: AppUser | null) {
    this.currentUserSubject.next(user);
  }
}
