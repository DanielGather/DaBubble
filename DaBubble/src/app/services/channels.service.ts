import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Channels } from '../types/types';
import { getDoc, doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChannelsService {
  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  async getChannelName(channelId: string): Promise<string | null> {
    const ref = doc(this.firestore, 'channels', channelId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    const data = snap.data();
    return (data as any)['channelName'] || null;
  }

  /**
   * Retrieves the data of a specific channel from Firestore.
   *
   * This method creates a reference to a Firestore document within the 'channels'
   * collection using the provided `channelId`. It then returns an observable
   * of the channel data using `docData`. The document ID will be added to the
   * resulting object under the `id` field.
   *
   * @param {string} channelId - The unique ID of the channel to retrieve.
   * @returns {Observable<Channels>} An observable emitting the channel data.
   */
  getChannelById$(channelId: string): Observable<Channels> {
    const docRef = doc(this.firestore, 'channels', channelId);
    return docData(docRef, { idField: 'id' }) as Observable<Channels>;
  }

  /**
   * noch nicht in verwendung
   * @returns
   */
  getChannelId$(): Observable<string | null> {
    return this.route.paramMap.pipe(map((params) => params.get('id')));
  }
}
