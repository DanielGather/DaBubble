import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  imgSources = [
    { email: 'img/form_mail.svg' },
    { password: 'img/form_password.svg' },
    { user: 'img/form_user.svg' },
  ];

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() imgSrc?: string;

  get iconSrc(): string {
    if (this.imgSrc) return this.imgSrc;
    if (this.type === 'email') return 'img/form_mail.svg';
    if (this.type === 'password') return 'img/form_password.svg';
    return 'img/form_user.svg';
  }
}
