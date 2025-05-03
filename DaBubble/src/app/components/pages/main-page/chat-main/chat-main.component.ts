import { Component, OnInit, Input } from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatType, ChatMessage } from '../../../../types/types';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from './chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from './private-chat-header/private-chat-header.component';
import { ChannelChatHeaderComponent } from './channel-chat-header/channel-chat-header.component';
import { ActivatedRoute } from '@angular/router';
import { ThreadsbarComponent } from './threadsbar/threadsbar.component';

@Component({
  selector: 'app-chat-main',
  imports: [
    CommonModule,
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent,
    ChannelChatHeaderComponent,
    ThreadsbarComponent,
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.html',
})
export class ChatMainComponent implements OnInit {
  /**
   * variable to use the enum ChatType in the html-template.
   */
  chatType = ChatType;

  /**
   * defines wich chat-layout should be used.
   */
  @Input() chatTypeInput: ChatType | string = ChatType.default;

  /**
   * the array of chatmessages wich should be rendered
   */
  chatMessages: Array<ChatMessage> = [];

  /**
   * this variable is used to have a reference of the current active route
   */
  constructor(private router: ActivatedRoute) {}

  //test
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
  //testends

  ngOnInit(): void {
    //test
    this.chatMessages = this.testMessages;
    //testend

    this.getChatTypeFromURL();
  }

  /**
   * this function is used to set the type of the chat-main component equal the type of the URL-parameter.
   */
  getChatTypeFromURL() {
    this.chatTypeInput =
      this.router.snapshot.paramMap.get('chatType') || ChatType.default;
    console.log('chattype is: ', this.chatTypeInput);
  }
}
