import {
  Component,
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

@Component({
  selector: 'app-search-dropdown',
  imports: [UserElementComponent, CommonModule],
  templateUrl: './search-dropdown.component.html',
  styleUrl: './search-dropdown.component.scss',
})
export class SearchDropdownComponent {
  @Input() visible: boolean = false;
  @Input() searchUser: boolean = false;
  @Input() searchChannel: boolean = false;
  @Input() searchTerm: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();

  channels = signal<ChannelWithId[]>([]);

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

  constructor(private elementRef: ElementRef, private router: Router) {
    effect(() => {
      console.log('CHANNELS IN DER SIDEBAR', this.channelsService.channels());
      this.channels.set(this.channelsService.channels());
    });
  }

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
}
