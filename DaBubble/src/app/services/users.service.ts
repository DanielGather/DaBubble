import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppUser } from '../types/types';
import { Observable } from 'rxjs';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  currentUserCredential:UserCredential|null = null;
  currentUserId:string|null = null;
  currentUser:AppUser|null = null;
  
  
  constructor() {}


  firestoreService: FirestoreService = inject(FirestoreService);

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;
}
