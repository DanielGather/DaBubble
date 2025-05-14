import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class MessagesDataService {
  constructor() {}

  private _currentThreadId = signal<number>(0);

  public testMessages: Array<ChatMessage> = [
    {
      message: 'Hallo ich bin der currentUser',
      timestamp: 'Dienstag, 14 Januar',
      name: 'Max Mustermann',
      userId: '123',
      emojis: [
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf', 'uzasdhbf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf', 'ukfbsdf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf'],
        },
      ],
      thread: [
        {
          message: 'Ja hallo Max! Wie geht es dir denn?',
          timestamp: 'Dienstag, 14 Januar',
          name: 'Testi Testo',
          userId: '1234',
          emojis: [
            {
              emojiId: 'test',
              userIdCount: ['luashbd', 'uszhbdf'],
            },
          ],
          thread: [],
        },
        {
          message: 'Schön, dass du hier bist!',
          timestamp: 'Dienstag, 14 Januar',
          name: 'Anna Schmidt',
          userId: '456',
          emojis: [],
          thread: [],
        },
      ],
    },
    {
      message:
        'Hallo ich bin der otherUser und habe jetzt auch einen langen text den ich für text zwecke geschrieben habe. irgendwas fäööt einem ja immer ein :D',
      timestamp: 'Dienstag, 15 Januar',
      name: 'Testi Testo',
      userId: '1234',
      emojis: [
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf', 'uzasdhbf', 'khuasdbf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf'],
        },
      ],
      thread: [
        {
          message: 'Stimmt, man findet immer etwas zu schreiben!',
          timestamp: 'Dienstag, 15 Januar',
          name: 'Max Mustermann',
          userId: '123',
          emojis: [
            {
              emojiId: 'test',
              userIdCount: ['luashbd', 'uszhbdf', 'uzasdhbf'],
            },
          ],
          thread: [],
        },
        {
          message: '😄 Das ist ja eine kreative Nachricht!',
          timestamp: 'Dienstag, 15 Januar',
          name: 'Peter Meyer',
          userId: '789',
          emojis: [],
          thread: [],
        },
        {
          message: 'Manchmal muss man einfach drauf los schreiben!',
          timestamp: 'Dienstag, 15 Januar',
          name: 'Anna Schmidt',
          userId: '456',
          emojis: [
            {
              emojiId: 'test',
              userIdCount: ['luashbd'],
            },
          ],
          thread: [],
        },
      ],
    },
    {
      message: 'Hallo ich bin der otherUser',
      timestamp: 'Dienstag, 16 Januar',
      name: 'Testi Testo',
      userId: '1234',
      emojis: [
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf', 'uzasdhbf', 'hasdbf'],
        },
      ],
      thread: [
        {
          message: 'Hi! Alles klar bei dir?',
          timestamp: 'Dienstag, 16 Januar',
          name: 'Peter Meyer',
          userId: '789',
          emojis: [],
          thread: [],
        },
        {
          message: 'Wir kennen uns schon eine Weile, oder? :)',
          timestamp: 'Dienstag, 16 Januar',
          name: 'Max Mustermann',
          userId: '123',
          emojis: [
            {
              emojiId: 'test',
              userIdCount: ['luashbd', 'uszhbdf'],
            },
          ],
          thread: [],
        },
      ],
    },
    {
      message:
        'Hallo ich bin der currentUser und schriebe eine ganz lange nachricht die einfach nicht aufhören will weil ich ja sooo viel zu erzählen habe und dir unbedingt dieses beispiel zeigen muss wie das menu sich der grösse der nachricht anpasst :D',
      timestamp: 'Dienstag, 14 Januar',
      name: 'Max Mustermann',
      userId: '123',
      emojis: [
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbdf'],
        },
        {
          emojiId: 'test',
          userIdCount: ['luashbd', 'uszhbf', 'uiqwei'],
        },
      ],
      thread: [
        {
          message: 'Wow, das ist wirklich eine lange Nachricht! 😮',
          timestamp: 'Dienstag, 14 Januar',
          name: 'Testi Testo',
          userId: '1234',
          emojis: [
            {
              emojiId: 'test',
              userIdCount: ['luashbd', 'uszhbdf', 'uzasdhbf', 'khuasdbf'],
            },
          ],
          thread: [],
        },
        {
          message: 'Super Beispiel für responsive Design!',
          timestamp: 'Dienstag, 14 Januar',
          name: 'Anna Schmidt',
          userId: '456',
          emojis: [],
          thread: [],
        },
        {
          message: 'Könnte das Menü noch länger machen? 🤔',
          timestamp: 'Dienstag, 14 Januar',
          name: 'Peter Meyer',
          userId: '789',
          emojis: [
            {
              emojiId: 'test',
              userIdCount: ['luashbd'],
            },
          ],
          thread: [],
        },
      ],
    },
  ];

  setCurrentThreadId(threadId: number) {
    this._currentThreadId.set(threadId);
    console.log('current thread:', this._currentThreadId());
  }

  getCurrentThreadId() {
    return this._currentThreadId();
  }
}
