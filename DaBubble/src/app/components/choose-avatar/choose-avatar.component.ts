import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-choose-avatar',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss',
})
export class ChooseAvatarComponent {}
