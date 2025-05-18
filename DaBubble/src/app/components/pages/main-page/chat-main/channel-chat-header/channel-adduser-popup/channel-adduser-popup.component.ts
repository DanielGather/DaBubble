import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../../../shared/button/button.component';
import { AppUser } from '../../../../../../types/types';

@Component({
  selector: 'app-channel-adduser-popup',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './channel-adduser-popup.component.html',
  styleUrl: './channel-adduser-popup.component.scss',
})
export class ChannelAdduserPopupComponent {
  constructor(private route: ActivatedRoute) {
    console.log('channelChat user list' + this.usersList$);
  }

  @Input() channelName!: string;
  @Input() usersList$!: Observable<AppUser[]>;
  @Input() usersNotInChannel$!: Observable<AppUser[]>;
  @Input() userIds$!: Observable<string[]>;

  firestore = inject(FirestoreService);
  isFocused: boolean = false;

  onFocus() {
    this.isFocused = true;
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
}
