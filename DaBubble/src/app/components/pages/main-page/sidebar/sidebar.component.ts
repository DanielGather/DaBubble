import { Component, inject, Output } from '@angular/core';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users.service';
import { map } from 'rxjs';
import { AppUser } from '../../../../types/types';
import { Channels } from '../../../../types/types';
import { FoldItemState, FoldKey, FoldState } from '../../../../types/types';
import { CollectionResult } from '../../../../types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelChatHeaderComponent } from '../chat-main/channel-chat-header/channel-chat-header.component';
import { MessagesDataService } from '../../../../services/messages-data.service';

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
  constructor(private router: Router, private route: ActivatedRoute) {}
  firestoreService: FirestoreService = inject(FirestoreService);
  userService: UsersService = inject(UsersService);
  private messageService: MessagesDataService = inject(MessagesDataService);

  online: boolean = true;
  clicked: boolean = true;
  showModal: boolean = false;

  userMessages: any;
  userId: number = 123123;

  users: UsersService = inject(UsersService);

  channelList$: Observable<Channels[]> = this.firestoreService.channelsList$;

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

  async ngOnInit() {
    let userData = await this.messageService.getUserData();
    console.log('USER DATA LOGGIN', userData);

    this.userService.userChatDataObject = userData;
    console.log('Das ganze Objekt:', userData);
    console.log(
      'So ruft man eine collection aus dem Objekt auf:',
      userData['channels']
    );
    console.log('So greift man auf das Array zu:', userData['channels'][0]);
    // console.log(
    //   'So erhält man die einzelnen Daten aus der Collection:',
    //   userData['channels'][0].data.channelName
    // );
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
    console.log(channelId);
  }
}
