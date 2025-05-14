import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channels } from '../types/types';
import { doc, docData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChannelsService {
  constructor(private firestore: Firestore) {}

  /**
   * get current channel id
   * @param channelId
   * @returns
   */
  getChannelById$(channelId: string): Observable<Channels> {
    const docRef = doc(this.firestore, 'channels', channelId);
    return docData(docRef, { idField: 'id' }) as Observable<Channels>;
  }
}
