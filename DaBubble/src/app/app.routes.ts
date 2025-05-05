import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component'; // Layout importieren
import { LegalsLayoutComponent } from './components/layouts/legals-layout/legals-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { PrivacyPolicyComponent } from './components/pages/legals/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/pages/legals/legal-notice/legal-notice.component';
import { ChooseAvatarComponent } from './components/pages/auth/choose-avatar/choose-avatar.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { ResetPasswordComponent } from './components/pages/auth/reset-password/reset-password.component';
import { SetPasswordComponent } from './components/pages/auth/set-password/set-password.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { ChatMainComponent } from './components/pages/main-page/chat-main/chat-main.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, //loads when entering the main domain
      { path: 'login', component: LoginComponent },
      { path: 'choose-avatar', component: ChooseAvatarComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'set-password', component: SetPasswordComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: 'chat/:chatType', component: ChatMainComponent }],
  },
  {
    path: '',
    component: LegalsLayoutComponent,
    children: [
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
    ],
  },
];
