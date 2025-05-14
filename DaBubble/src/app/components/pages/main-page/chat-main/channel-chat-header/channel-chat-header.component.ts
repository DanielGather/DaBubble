import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { ChannelEditPopupComponent } from '../channel-edit-popup/channel-edit-popup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../../services/users.service';
import { map, Observable, combineLatest, switchMap } from 'rxjs';
import { AppUser } from '../../../../../types/types';
import { arrayUnion } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../services/firestore.service';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { ChannelsService } from '../../../../../services/channels.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-chat-header',
  imports: [
    ButtonComponent,
    ChannelEditPopupComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './channel-chat-header.component.html',
  styleUrl: './channel-chat-header.component.scss',
})
export class ChannelChatHeaderComponent {
  constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
    console.log('channelChat user list' + this.usersList$);
  }

  firestore = inject(FirestoreService);
  channelsService = inject(ChannelsService);
  showChannelPopup = false;
  showUserPopup = false;
  users: UsersService = inject(UsersService);
  usersList$: Observable<AppUser[]> = this.getSortedUser();
  usersNotInChannel$!: Observable<AppUser[]>;
  userIds$!: Observable<string[]>;
  channelHelper = inject(MessagesDataService);

  ngOnInit() {
    this.initUsersNotInChannel();
    this.initUserIds();
  }

/**
 * Initializes the `usersNotInChannel$` observable.
 *
 * This function reacts to changes in the route parameter `id` (the channel ID)
 * and combines the list of all users with the currently selected channel's data.
 * It filters out users who are already part of the channel and emits only the users
 * who are not yet in the channel.
 *
 * The result is an observable list of users who can still be added to the channel.
 */
private initUsersNotInChannel() {
  this.usersNotInChannel$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    map((channelId) => {
      if (!channelId) {
        throw new Error('❌ No channel ID found in the URL.');
      }
      return channelId;
    }),
    switchMap((channelId) =>
      combineLatest([
        this.usersList$,
        this.channelsService.getChannelById$(channelId),
      ]).pipe(
        map(([users, channel]) =>
          users.filter((user) => !channel.userIds.includes(user.id!))
        )
      )
    )
  );
}


/**
 * Initializes the `userIds$` observable.
 *
 * This function listens for changes in the route parameter `id` (representing the channel ID)
 * and retrieves the list of user IDs (`userIds`) associated with the current channel.
 *
 * The result is an observable that emits the array of user IDs currently assigned to the channel.
 * Useful for displaying the number of users in the channel or managing user-channel membership.
 */
private initUserIds() {
  this.userIds$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    map((channelId) => {
      if (!channelId) {
        throw new Error('❌ No channel ID found in the URL.');
      }
      return channelId;
    }),
    switchMap((channelId) =>
      this.channelsService
        .getChannelById$(channelId)
        .pipe(map((channel) => channel.userIds))
    )
  );
}


  /**
   *
   * @returns get current channel userIds
   */
  getUserIds$(): Observable<string[]> {
    const channelId = this.getCurrentChannelIdFromUrl();
    return this.channelsService
      .getChannelById$(channelId!)
      .pipe(map((channel) => channel.userIds));
  }

  getCurrentChannelIdFromUrl(): string | null {
    const currentUrl = window.location.href;
    if (!currentUrl.includes('channel/')) {
      return null;
    }
    const parts = currentUrl.split('channel/');
    if (parts.length > 1) {
      return parts[1].split('/')[0];
    }
    return null;
  }

  /**
   * add user to channel
   * @param id
   */
  async addUserToChannel(id: string) {
    const channelId = this.getCurrentChannelIdFromUrl();
    if (!channelId) {
      console.error('Channel ID konnte nicht aus der URL gelesen werden.');
      return;
    }
    await this.firestore.updateDoc('channels', channelId, {
      userIds: arrayUnion(id),
    });
  }

  /**
   * toggle popup
   */
  toggleAddUserToChannelPopUp() {
    this.showUserPopup = !this.showUserPopup;
  }

  /**
   * get user from firebase and sort it
   * @returns
   */
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

  /**
   * open channel edit
   */
  openChannelPopup() {
    this.showChannelPopup = true;
  }

  /**
   * close channel edit
   */
  closeChannelPopup() {
    this.showChannelPopup = false;
  }

  /**
   * Closes open popups when a click occurs outside the component's DOM element.
   * @param event - The MouseEvent triggered by a click anywhere in the document.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.showUserPopup) {
      this.showUserPopup = false;
    }
    if (!clickedInside && this.showChannelPopup) {
      this.showChannelPopup = false;
    }
  }
}
