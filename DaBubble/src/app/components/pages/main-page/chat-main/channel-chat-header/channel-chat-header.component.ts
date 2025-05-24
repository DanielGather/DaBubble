import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../../services/users.service';
import { map, Observable, combineLatest, switchMap } from 'rxjs';
import { AppUser } from '../../../../../types/types';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { ChannelsService } from '../../../../../services/channels.service';
import { ActivatedRoute } from '@angular/router';
import { ChannelEditPopupComponent } from './channel-edit-popup/channel-edit-popup.component';
import { ChannelAdduserPopupComponent } from './channel-adduser-popup/channel-adduser-popup.component';
import { ProfileUserComponent } from '../../shared/profile-user/profile-user.component';

@Component({
  selector: 'app-channel-chat-header',
  imports: [
    ChannelEditPopupComponent,
    ChannelAdduserPopupComponent,
    FormsModule,
    CommonModule,
    ProfileUserComponent
  ],
  templateUrl: './channel-chat-header.component.html',
  styleUrl: './channel-chat-header.component.scss',
})
export class ChannelChatHeaderComponent {
  constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
    console.log('channelChat user list' + this.usersList$);
  }

  channelsService = inject(ChannelsService);
  // gets no call, is that needed here?
  channelHelper = inject(MessagesDataService);
  usersService: UsersService = inject(UsersService);

  usersList$: Observable<AppUser[]> = this.usersService.getSortedUser();
  usersNotInChannel$!: Observable<AppUser[]>;
  userIds$!: Observable<string[]>;

  showChannelPopup = false;
  showUserPopup = false;
  channelName: string = '';
  channelDescription: string = '';

  ngOnInit() {
    this.initUsersNotInChannel();
    this.initUserIdsFromCurrentChannel();
    this.route.paramMap.subscribe((params) => {
      const channelId = params.get('id');
      if (channelId) {
        this.loadChannelName(channelId);
         this.loadChannelDescription(channelId);
      }
    });
  }

  /**
   * init user id, fill array userIds
   *
   */
  private initUserIdsFromCurrentChannel() {
    this.userIds$ = this.getChannelIdFromRouteUrl().pipe(
      switchMap((channelId) =>
        this.usersService.getUserIdsForCurrentChannel$(channelId)
      )
    );
  }

  /**
   * init users not in channel
   */
  private initUsersNotInChannel() {
    this.usersNotInChannel$ = this.getChannelIdFromRouteUrl().pipe(
      switchMap((channelId) => this.getUsersNotInChannel$(channelId))
    );
  }

  /**
   * all users get substracted with users not in channel
   * it will return the users that are in the channel
   * @param channelId
   * @returns
   */
  private getUsersNotInChannel$(channelId: string): Observable<AppUser[]> {
    return combineLatest([
      this.usersList$,
      this.channelsService.getChannelById$(channelId),
    ]).pipe(
      map(([users, channel]) =>
        users.filter((user) => user.id && !channel.userIds.includes(user.id))
      )
    );
  }

  /**
   * get channel id from router
   * @returns
   */
  private getChannelIdFromRouteUrl(): Observable<string> {
    return this.route.paramMap.pipe(
      map((params) => {
        const channelId = params.get('id');
        if (!channelId) {
          throw new Error('No channel ID found in the URL.');
        }
        return channelId;
      })
    );
  }

  /**
   * fills the channelName array with current channel name
   * @param channelId
   * @returns
   */
  private async loadChannelName(channelId: string) {
    try {
      const name = await this.channelsService.getChannelName(channelId);
      if (!name) {
        console.warn('Kein Channel-Name gefunden.');
        return;
      }

      this.channelName = name;
      console.log('Channel-Name:', this.channelName);
    } catch (error) {
      console.error('Fehler beim Laden des Channel-Namens:', error);
    }
  }

  private async loadChannelDescription(channelId:string) {
try {
  const description = await this.channelsService.getChannelDescription(channelId);
  if (!description) {
    console.log('No description found');
    return
    
  }
  this.channelDescription = description;
      console.log('Description-Name:', this.channelName);
    } catch (error) {
      console.error('Fehler beim Laden des Channel-Description:', error);
    }
  }

  /**
   * toggle popup
   */
  toggleAddUserToChannelPopUp() {
    this.showUserPopup = !this.showUserPopup;
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
   * actually not used, maybe important later
   * @param avatarId
   * @returns
   */
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
   * Closes open popups when a click occurs outside the component's DOM element.
   * @param event - The MouseEvent triggered by a click anywhere in the document.
   */
  @HostListener('document:mousedown', ['$event'])
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
