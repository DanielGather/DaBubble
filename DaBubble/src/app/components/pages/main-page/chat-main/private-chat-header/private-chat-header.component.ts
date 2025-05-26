import { Component } from '@angular/core';

@Component({
  selector: 'app-private-chat-header',
  imports: [],
  templateUrl: './private-chat-header.component.html',
  styleUrl: './private-chat-header.component.scss'
})
export class PrivateChatHeaderComponent {
  online:boolean = true;
}
