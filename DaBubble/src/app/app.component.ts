import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { PrivateMessageService } from './services/private-message.service';
import { MessagesDataService } from './services/messages-data.service';
import { ChannelsService } from './services/channels.service';
import { EmojiSubscribeService } from './services/emoji-subscribe.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DaBubble';

  //injects
  private privateMessageService: PrivateMessageService = inject(
    PrivateMessageService
  );
  private messageService: MessagesDataService = inject(MessagesDataService);
  private channelsService: ChannelsService = inject(ChannelsService);
  private emojiSubscribeService: EmojiSubscribeService = inject(EmojiSubscribeService);

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('id')!;
    this.authService.observeAuthState();
    this.privateMessageService.subscribeToPrivateMessage(userId);
    this.messageService.subscribeToMessages(userId);
    this.channelsService.subscribeToChannels(userId);
  }
}
