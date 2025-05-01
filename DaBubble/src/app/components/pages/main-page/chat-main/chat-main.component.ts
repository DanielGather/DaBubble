import { Component, OnInit, Input } from '@angular/core';
import { ChatInputComponent } from '../shared/chat-input/chat-input.component';
import { ChatType, ChatMessage } from '../../../../types/types';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from '../chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from './private-chat-header/private-chat-header.component';
import { ChannelChatHeaderComponent } from './channel-chat-header/channel-chat-header.component';


@Component({
  selector: 'app-chat-main',
  imports: [
    CommonModule,
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent,
    ChannelChatHeaderComponent
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.html',
})
export class ChatMainComponent implements OnInit {
  chatType = ChatType;
  @Input() chatTypeInput:ChatType = ChatType.channel;
  chatMessages: Array<ChatMessage> = [];

  //test
  testMessages: Array<ChatMessage> = [
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
        }
      ]
    },
    {
      message: 'Hallo ich bin der otherUser und habe jetzt auch einen langen text den ich für text zwecke geschrieben habe. irgendwas fäööt einem ja immer ein :D',
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
        }
      ]
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
        }
      ]
    },
    {
      message: 'Hallo ich bin der currentUser und schriebe eine ganz lange nachricht die einfach nicht aufhören will weil ich ja sooo viel zu erzählen habe und dir unbedingt dieses beispiel zeigen muss wie das menu sich der grösse der nachricht anpasst :D',
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
          userIdCount: ['luashbd', 'uszhbdf'],
        }
      ]
    },
    
  ];
  //testends

  ngOnInit(): void {
    this.chatMessages = this.testMessages;
  }
}
