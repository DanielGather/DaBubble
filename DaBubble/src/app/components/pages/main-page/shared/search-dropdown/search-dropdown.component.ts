import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { UserElementComponent } from '../../../../shared/user-element/user-element.component';
import { AppUser, ChannelWithId, Message } from '../../../../../types/types';
import { map, Observable } from 'rxjs';
import { UsersService } from '../../../../../services/users.service';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../../../services/channels.service';
import { Router } from '@angular/router';
import { OtherUsersPopupComponent } from '../other-users-popup/other-users-popup.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { ThreadService } from '../../../../../services/thread.service';

@Component({
  selector: 'app-search-dropdown',
  imports: [UserElementComponent, CommonModule, OtherUsersPopupComponent],
  templateUrl: './search-dropdown.component.html',
  styleUrl: './search-dropdown.component.scss',
})
export class SearchDropdownComponent {
  @Input() visible: boolean = false;
  @Input() searchUser: boolean = false;
  @Input() searchChannel: boolean = false;
  @Input() searchTerm: string = '';
  @Input() searchText: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  messageService = inject(MessagesDataService);
  selectedUser: AppUser | null = null;
  showUserPopupVisible: boolean = false;
  threadService = inject(ThreadService);

  get messages() {
    return computed(() => {
      const searchTerm = this.searchTerm;
      const messages = this.messageService.messages();

      return messages.filter((message) =>
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  get channels() {
    return computed(() =>
      this.channelsService
        .channels()
        .filter((channel) => channel.data.channelName.includes(this.searchTerm))
    );
  }

  usersService: UsersService = inject(UsersService);
  channelsService: ChannelsService = inject(ChannelsService);

  get usersList$(): Observable<AppUser[]> {
    return this.usersService.usersList$.pipe(
      map((users) =>
        users
          .filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return fullName.includes(this.searchTerm.toLowerCase());
          })
          .sort((a, b) => a.firstName.localeCompare(b.firstName))
      )
    );
  }

  constructor(private elementRef: ElementRef, private router: Router) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.visible && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  openChannel(channelId: string) {
    this.router.navigate(['/chat/channel', channelId]);
  }

  redirectToChannel(message: any) {
    if (message.privatChatId.length != '') {
      this.router.navigate(['/chat/private', message.privatChatId]);
    }
    if (message.privatChatId.length == 0 && !message.isThreadMessage) {
      this.router.navigate(['/chat/channel', message.channelId]);
    }
    if (message.privatChatId.length == 0 && message.isThreadMessage) {
      this.router.navigate([
        '/chat/channel',
        message.channelId,
        'thread',
        message.threadId,
      ]);
      this.threadService.openThread(message.threadId, message.channelId);
    }
  }

  onUserClicked(user: AppUser) {
    this.selectedUser = user;
    this.showUserPopupVisible = true;
  }

  closeUserPopup() {
    this.showUserPopupVisible = false;
  }
}
