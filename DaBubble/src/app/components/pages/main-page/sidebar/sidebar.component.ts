import { Component, effect, inject, Output, signal } from '@angular/core';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users.service';
import { map } from 'rxjs';
import { AppUser, ChannelsTest, ChannelWithId } from '../../../../types/types';
import { Channels } from '../../../../types/types';
import { FoldItemState, FoldKey, FoldState } from '../../../../types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelChatHeaderComponent } from '../chat-main/channel-chat-header/channel-chat-header.component';
import { MessagesDataService } from '../../../../services/messages-data.service';
import { ChannelsService } from '../../../../services/channels.service';
import { PrivateMessageService } from '../../../../services/private-message.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    SearchbarComponent,
    CreateChannelComponent,
    ChannelChatHeaderComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('foldAnimation', [
      transition(':enter', [
        style({ transform: 'scaleY(0)', opacity: 0 }),
        animate('300ms', style({ transform: 'scaleY(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'scaleY(0)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    effect(() => {
      console.log('CHANNELS IN DER SIDEBAR', this.channelsService.channels());
      this.channels.set(this.channelsService.channels());
    });
  }

  //###################VARIABLEN######################

  private firestoreService: FirestoreService = inject(FirestoreService);
  private userService: UsersService = inject(UsersService);
  private messageService: MessagesDataService = inject(MessagesDataService);
  private channelsService: ChannelsService = inject(ChannelsService);
  private privateMessagesService: PrivateMessageService = inject(
    PrivateMessageService
  );

  online: boolean = true;
  clicked: boolean = true;
  showModal: boolean = false;

  users: UsersService = inject(UsersService);

  channels = signal<ChannelWithId[]>([]);

  usersList$: Observable<AppUser[]> = this.getSortedUser();

  DEFAULT_FOLD_ITEM: FoldItemState = {
    rotation: 0,
    isRotated: false,
    isFolded: false,
  };

  foldState: FoldState = {
    channel: { ...this.DEFAULT_FOLD_ITEM },
    contacts: { ...this.DEFAULT_FOLD_ITEM },
  };

  //###################VARIABLEN######################

  async ngOnInit() {
    let userData = await this.messageService.getUserData();
    this.userService.userChatDataObject = userData;
  }

  toggleFold(key: FoldKey) {
    const state = this.foldState[key];
    state.rotation += state.isRotated ? 90 : -90;
    state.isRotated = !state.isRotated;
    state.isFolded = !state.isFolded;
  }

  getSortedUser() {
    console.log('sorted', this.users.usersList$);
    return this.users.usersList$.pipe(
      map((list) =>
        [...list].sort((a, b) =>
          a.firstName.localeCompare(b.firstName, 'de', { sensitivity: 'base' })
        )
      )
    );
  }

  navBarClicked() {
    this.clicked = !this.clicked;
  }

  closeChannelWindow(close: boolean) {
    this.showModal = close;
  }

  getAvatar(avatarId: number) {
    switch (avatarId) {
      case 1:
        return 'img/user_1.png';
      case 2:
        return 'img/user_2.png';
      case 3:
        return 'img/user_3.png';
      case 4:
        return 'img/user_4.png';
      case 5:
        return 'img/user_5.png';
      case 6:
        return 'img/user_6.png';
    }
    return 'img/user_1.png';
  }

  openChannel(channelId: string) {
    this.router.navigate(['/chat/channel', channelId]);
  }

  openDirectMessage(chatPartnerId: string) {
    let userId = localStorage.getItem('id')!;
    if (!this.privateChannelExist(chatPartnerId, userId)) {
      this.firestoreService.addDoc('privateChats', {
        creatorId: userId,
        userIds: [userId, chatPartnerId],
      });
    }
    this.router.navigate(['/chat/private', chatPartnerId]);
  }

  privateChannelExist(chatPartnerId: string, userId: string) {
    let privateChannel = this.privateMessagesService
      .privateMessages()
      .find(
        (channel) =>
          channel.userIds.includes(chatPartnerId) &&
          channel.userIds.includes(userId)
      );
    if (privateChannel) {
      return true;
    }
    return false;
  }
}
