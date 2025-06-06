import { effect, Injectable, signal } from '@angular/core';
import { ThreadState } from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private _threadState = signal<ThreadState>({
    isOpen: false,
    currentThreadId: null,
    currentChannelId: null,
  });

  threadState = this._threadState.asReadonly();

  threadbarOpen = () => this._threadState().isOpen;
  currentThreadId = () => this._threadState().currentThreadId;
  currentChannelId = () => this._threadState().currentChannelId;

  openThread(threadId: string, channelId: string) {
    this._threadState.set({
      isOpen: true,
      currentThreadId: threadId,
      currentChannelId: channelId,
    });
  }

  closeThread() {
    this._threadState.set({
      isOpen: false,
      currentThreadId: null,
      currentChannelId: null,
    });
  }

  constructor() {
    effect( () => {
      if(this._threadState()) {
        this.closeThread
      }
    })
  }
}
