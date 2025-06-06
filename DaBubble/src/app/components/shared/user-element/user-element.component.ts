import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-element',
  imports: [CommonModule],
  templateUrl: './user-element.component.html',
  styleUrl: './user-element.component.scss',
})
export class UserElementComponent {
  @Input() name: string = '';
  @Input() isOnline: boolean = false;
  @Input() avatarSrc: string = '';
}
