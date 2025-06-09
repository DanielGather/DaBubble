import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  input,
  Output,
  signal,
} from '@angular/core';
import { UserElementComponent } from '../../../../shared/user-element/user-element.component';
import { AppUser, ChannelWithId } from '../../../../../types/types';
import { map, Observable } from 'rxjs';
import { UsersService } from '../../../../../services/users.service';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../../../services/channels.service';
import { Router } from '@angular/router';
import { OtherUsersPopupComponent } from '../other-users-popup/other-users-popup.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';

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
  @Output() visibleChange = new EventEmitter<boolean>();

  messageService = inject(MessagesDataService);

  get messages() {
    return computed(() => {
      const searchTerm = this.searchTerm;
      const messages = this.messageService.messages();
      console.log('gurk', messages);

      return messages.filter((message) => message.message.includes(searchTerm));
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

  redirectToChannel() {
    console.log('redirecting');
  }
}
