import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ChooseAvatarComponent } from '../../pages/auth/choose-avatar/choose-avatar.component';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { ResetPasswordComponent } from '../../pages/auth/reset-password/reset-password.component';
import { SetPasswordComponent } from '../../pages/auth/set-password/set-password.component';
import { SignupComponent } from '../../pages/auth/signup/signup.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [
    LoginComponent,
    ButtonComponent,
    SignupComponent,
    ChooseAvatarComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
