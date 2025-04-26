import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-avatar',
  imports: [CommonModule, ModalComponent, ButtonComponent],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss',
})
export class ChooseAvatarComponent {
  currentAvatarSrc = '/img/avatar.svg';
  avatars = [1, 2, 3, 4, 5, 6];
  avatarIsSelected = false;

  changeAvatar(avatarSrc: string) {
    this.avatarIsSelected = true;
    this.currentAvatarSrc = avatarSrc;
    setTimeout(() => {
      this.avatarIsSelected = false;
    }, 100);
  }
}
