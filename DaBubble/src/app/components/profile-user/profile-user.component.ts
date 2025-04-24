import { Component, EventEmitter, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-profile-user',
  imports: [NgStyle],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent {
  active: boolean = true;
  green = '#92c83e';

  @Output() close = new EventEmitter<void>();

  closeProfile() {
    this.close.emit(); // Signal an Elternkomponente
  }
}
