import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DaBubbleLogoComponent } from '../../../shared/da-bubble-logo/da-bubble-logo.component';
import { LegalLinksComponent } from '../shared/legal-links/legal-links.component';
import { UsersService } from '../../../../services/users.service';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-choose-avatar',
  imports: [
    CommonModule,
    ModalComponent,
    ButtonComponent,
    RouterLink,
    DaBubbleLogoComponent,
    LegalLinksComponent,
  ],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss',
})
export class ChooseAvatarComponent {
  currentAvatarSrc: string = '/img/avatar.svg';
  currentAvatarId: number = 1;
  avatars = [1, 2, 3, 4, 5, 6];
  avatarIsSelected = false;
  firestoreService = inject(FirestoreService);
  usersService = inject(UsersService);

  constructor(private router: Router) {}

  setNewAvatar(avatarIndex: any) {
    this.currentAvatarId = avatarIndex;
    this.changeAvatarImage(`/img/user_${avatarIndex}_small.png`);
  }

  changeAvatarImage(avatarSrc: string) {
    this.avatarIsSelected = true;
    this.currentAvatarSrc = avatarSrc;
    setTimeout(() => {
      this.avatarIsSelected = false;
    }, 75);
  }

  async updateFirestoreUserData() {
    if (this.usersService.currentUser) {
      this.usersService.currentUser.avatarId = this.currentAvatarId;

      await this.firestoreService.updateDoc(
        `users`,
        this.usersService.currentUserId!,
        this.usersService.currentUser
      );
      await this.router.navigateByUrl('/chat/private');
    }
  }
}
