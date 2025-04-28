import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppUser } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  firestoreService: FirestoreService = inject(FirestoreService);

  readonly usersList$: Observable<AppUser[]> =
    this.firestoreService.getCollectionData('users') as Observable<AppUser[]>;
}
