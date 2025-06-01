import {
  Component,
  Input,
  inject,
  computed,
  signal,
  effect,
  SimpleChanges,
} from '@angular/core';
import { ChatInputComponent } from '../../chat-main/chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from '../../chat-main/chat-messages-container/chat-messages-container.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { ChatMessage } from '../../../../../types/types';
import { ThreadService } from '../../../../../services/thread.service';

@Component({
  selector: 'app-threadsbar',
  imports: [ChatInputComponent, CommonModule, ChatMessagesContainerComponent],
  templateUrl: './threadsbar.component.html',
  styleUrl: './threadsbar.component.scss',
})
export class ThreadsbarComponent {
  @Input() chatMessages: Array<ChatMessage> = [];

  private _chatMessagesSignal = signal<Array<ChatMessage>>([]);

  constructor() {}

  ngOnInit() {
    console.log('threadmessages', this.threadMessage());
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chatMessages']) {
      this._chatMessagesSignal.set(this.chatMessages);
    }
  }

  threadMessage = computed(() => {
    const currentId = this.threadbarService.currentThreadId();
    const messages = this._chatMessagesSignal;
    return messages().filter((message) => message.threadId === currentId);
  });

  messageDataService = inject(MessagesDataService);
  isOpen: boolean = true;
  currentThreadMessageId: string = '';

  threadbarService = inject(ThreadService);

  closeThread() {
    this.threadbarService.closeThread();
  }
}
