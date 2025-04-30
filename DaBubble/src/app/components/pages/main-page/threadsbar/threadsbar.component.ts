import { Component } from '@angular/core';
import { ChatInputComponent } from '../shared/chat-input/chat-input.component';

@Component({
  selector: 'app-threadsbar',
  imports: [ChatInputComponent],
  templateUrl: './threadsbar.component.html',
  styleUrl: './threadsbar.component.scss',
})
export class ThreadsbarComponent {}
