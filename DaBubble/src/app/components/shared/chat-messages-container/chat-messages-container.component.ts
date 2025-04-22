import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-messages-container',
  imports: [],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss'
})
export class ChatMessagesContainerComponent {
  @Input() chatType:ChatType = ChatType.channel; 
}
