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
import { ChatInputType, ChatType, Message } from '../../../../../types/types';
import { ThreadService } from '../../../../../services/thread.service';

@Component({
  selector: 'app-threadsbar',
  imports: [ChatInputComponent, CommonModule, ChatMessagesContainerComponent],
  templateUrl: './threadsbar.component.html',
  styleUrl: './threadsbar.component.scss',
})
export class ThreadsbarComponent {
  //types
  chatInputType = ChatInputType;

  //state boolean
  isOpen: boolean = true;

  //input
  @Input() chatMessages: Array<Message> = [];

  //inject
  threadbarService = inject(ThreadService);
  chatType = ChatType;

  //signal
  private _chatMessagesSignal = signal<Array<Message>>([]);
  threadMessage = computed(() => {
    const currentId = this.threadbarService.currentThreadId();
    const messages = this._chatMessagesSignal;
    return messages().filter((message) => message.threadId === currentId);
  });

  //other
  currentThreadMessageId: string = '';

  constructor() { }

  ngOnInit() {
    console.log('threadmessages', this.threadMessage());
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chatMessages']) {
      this._chatMessagesSignal.set(this.chatMessages);
    }
  }

  closeThread() {
    this.threadbarService.closeThread();
  }

}
