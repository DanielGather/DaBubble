import { ActivatedRoute } from '@angular/router';
import { Injectable, signal, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Channels, ChannelsTest, ChannelWithId } from '../types/types';
import { doc, docData, Firestore, getDoc } from '@angular/fire/firestore';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelsService {


  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  private firestoreService: FirestoreService = inject(FirestoreService);
  private unsubscribeFn: (() => void) | null = null;
  private _channels = signal<ChannelWithId[]>([]);
  public readonly channels = this._channels.asReadonly();


  async getChannelName(channelId: string): Promise<string | null> {
    const ref = doc(this.firestore, 'channels', channelId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    const data = snap.data();
    return (data as any)['channelName'] || null;
  }

    async getChannelCreatorId(channelId: string): Promise<string | null> {
    const ref = doc(this.firestore, 'channels', channelId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    const data = snap.data();
    return (data as any)['channelCreatorId'] || null;
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

  subscribeToChannels(userId: string): void {
    const q = query(
      collection(this.firestoreService.firestore, 'channels'),
      where('userIds', 'array-contains', userId)
    );
    console.log('Query:', q);

    this.unsubscribeFn = onSnapshot(q, (snapshot) => {
      const channels: ChannelWithId[] = snapshot.docs.map((doc) => {
        // Hier erstellen Sie ein neues Objekt, das sowohl die ID als auch die Daten enthält
        return {
          id: doc.id, // Die ID des Dokuments
          data: doc.data() as ChannelsTest, // Die Daten des Dokuments
        };
      });
      this._channels.set(channels); // Aktualisieren Sie Ihren State mit den Channels (inkl. IDs)
      console.log('channels subscribed:', channels);
    });
  }

  unsubscribeFromPrivateChats(): void {
    this.unsubscribeFn?.();
  }
}
