import { Component } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { ButtonComponent } from '../button/button.component';
import { SignupComponent } from '../../signup/signup.component';
import { ChooseAvatarComponent } from '../../choose-avatar/choose-avatar.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    LoginComponent,
    ButtonComponent,
    SignupComponent,
    ChooseAvatarComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
