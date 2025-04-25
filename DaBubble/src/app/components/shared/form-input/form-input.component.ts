import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  imgSources = [
    { email: 'img/form-mail.svg' },
    { password: 'img/form-password.svg' },
    { user: 'img/form-user.svg' },
  ];

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() imgSrc?: string;

  get iconSrc(): string {
    if (this.imgSrc) return this.imgSrc;
    if (this.type === 'email') return 'img/form-mail.svg';
    if (this.type === 'password') return 'img/form-password.svg';
    return 'img/form-user.svg';
  }
}
