import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../../../shared/button/button.component';
import { AppUser } from '../../../../../../types/types';
import { FormsModule } from '@angular/forms';
import { OtherUsersPopupComponent } from '../../../shared/other-users-popup/other-users-popup.component';

@Component({
  selector: 'app-channel-adduser-popup',
  imports: [
    ButtonComponent,
    CommonModule,
    FormsModule,
    OtherUsersPopupComponent,
  ],
  templateUrl: './channel-adduser-popup.component.html',
  styleUrl: './channel-adduser-popup.component.scss',
})
export class ChannelAdduserPopupComponent {
  constructor(private route: ActivatedRoute) {}

  @Input() channelName!: string;
  @Input() usersList$!: Observable<AppUser[]>;
  @Input() usersNotInChannel$!: Observable<AppUser[]>;
  @Input() userIds$!: Observable<string[]>;
  @Input() fillUserPopupWithAddPeopleClicked!: boolean;
  @Input() fillUserPopupWithShowAddedUser!: boolean;
  @Input() usersInChannel$!: Observable<AppUser[]>;

  @Output() closePopup = new EventEmitter<void>();
  @Output() openAddUserPopup = new EventEmitter<void>();
  firestore = inject(FirestoreService);
  isFocused: boolean = false;
  filteredUsersNotInChannel$: Observable<AppUser[]> = of([]);
  searchTerm: string = '';
  showUserPopupVisible = false;

  @Input() mode: 'add' | 'show' | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fillUserPopupWithAddPeopleClicked']) {
      console.log(
        'fillUserPopupWithAddPeopleClicked:',
        this.fillUserPopupWithAddPeopleClicked
      );
    }
    if (changes['fillUserPopupWithShowAddedUser']) {
      console.log(
        'fillUserPopupWithShowAddedUser:',
        this.fillUserPopupWithShowAddedUser
      );
    }
  }

  onFocus() {
    this.isFocused = true;
    this.filterUserNotInChannelByNameInput();
  }

  onBlur() {
    this.isFocused = false;
  }

  /**
   * add user to channel
   * @param id
   */
  async addUserToChannel(id: string) {
    const channelId = this.route.snapshot.paramMap.get('id');
    if (!channelId) {
      return;
    }

    try {
      await this.firestore.updateDoc('channels', channelId, {
        userIds: arrayUnion(id),
      });
      console.log(`Benutzer ${id} wurde dem Channel ${channelId} hinzugefügt.`);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Benutzers zum Channel:', error);
    }
  }

  filterUserNotInChannelByNameInput() {
    this.filteredUsersNotInChannel$ = this.usersNotInChannel$.pipe(
      map((users) =>
        users.filter((user) =>
          (user.firstName + ' ' + user.lastName)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
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

  toggleClickedUserPopup() {
    this.showUserPopupVisible = !this.showUserPopupVisible;
  }
}
