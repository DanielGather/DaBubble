import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ChooseAvatarComponent } from '../../pages/choose-avatar/choose-avatar.component';
import { ResetPasswordComponent } from '../../pages/reset-password/reset-password.component';
import { LoginComponent } from '../../pages/login/login.component';
import { SignupComponent } from '../../pages/signup/signup.component';
import { SetPasswordComponent } from '../../pages/set-password/set-password.component';



@Component({
  selector: 'app-auth-layout',
  imports: [
    LoginComponent,
    ButtonComponent,
    SignupComponent,
    ChooseAvatarComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
