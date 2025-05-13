import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { ChannelEditPopupComponent } from '../channel-edit-popup/channel-edit-popup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../../services/users.service';
import { map, Observable, combineLatest, of } from 'rxjs';
import { AppUser } from '../../../../../types/types';
import { arrayUnion } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../services/firestore.service';
import { switchMap } from 'rxjs/operators';
import { MessagesDataService } from '../../../../../services/messages-data.service';

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
  firestore = inject(FirestoreService);
  showChannelPopup = false;
  showUserPopup = false;
  users: UsersService = inject(UsersService);
  usersList$: Observable<AppUser[]> = this.getSortedUser();
  usersNotInChannel$!: Observable<AppUser[]>;
  userIds$ = this.getUserIds$();
  channelHelper = inject(MessagesDataService);

  constructor(private elementRef: ElementRef) {
    console.log('channelChat user list' + this.usersList$);
  }

  /**
   * filters user who should available in add user list
   * @returns
   */
  ngOnInit() {
    const channelId = this.getCurrentChannelIdFromUrl();
    if (!channelId) {
      console.error('Keine gültige Channel-ID in der URL');
      return;
    }
    this.usersNotInChannel$ = combineLatest([
      this.usersList$,
      this.firestore.getChannelById$(channelId),
    ]).pipe(
      map(([users, channel]) =>
        users.filter((user) => !channel.userIds.includes(user.id!))
      )
    );
  }

  /**
   *
   * @returns get current channel userIds
   */
  getUserIds$(): Observable<string[]> {
    const channelId = this.getCurrentChannelIdFromUrl();
    return this.firestore
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
