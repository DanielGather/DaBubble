import { inject, Injectable, signal } from '@angular/core';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirestoreService } from './firestore.service';

import { Message, PrivateChat } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PrivateMessageService {
  firestoreService: FirestoreService = inject(FirestoreService);
  private unsubscribeFn: (() => void) | null = null;
  private _privateMessages = signal<PrivateChat[]>([]);
  public readonly privateMessages = this._privateMessages.asReadonly();

  constructor() {}

  subscribeToPrivateMessage(userId: string): void {
    const q = query(
      collection(this.firestoreService.firestore, 'privateChats'),
      where('userIds', 'array-contains', userId)
    );
    console.log('Query:', q);

    this.unsubscribeFn = onSnapshot(q, (snapshot) => {
      const privateChats = snapshot.docs.map(
        (doc) => doc.data() as PrivateChat
      );
      this._privateMessages.set(privateChats);
      console.log('privateChats subscribed:', privateChats);
    });
  }

  unsubscribeFromPrivateChats(): void {
    this.unsubscribeFn?.();
  }
}
