import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { PrivateMessageService } from './services/private-message.service';
import { MessagesDataService } from './services/messages-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DaBubble';

  private privateMessageService: PrivateMessageService = inject(
    PrivateMessageService
  );
  private messageService: MessagesDataService = inject(MessagesDataService);

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('id')!;
    this.authService.observeAuthState();
    this.privateMessageService.subscribeToPrivateMessage(userId);
    this.messageService.subscribeToMessages(userId);
  }
}
