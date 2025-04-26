import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component'; // Layout importieren
import { LegalsLayoutComponent } from './components/layouts/legals-layout/legals-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { PrivacyPolicyComponent } from './components/pages/legals/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/pages/legals/legal-notice/legal-notice.component';
import { PrivateChatComponent } from './components/pages/main-page/private-chat/private-chat.component';


export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'a-private-chat-variable', pathMatch: 'full' },
      { path: 'a-private-chat-variable', component: PrivateChatComponent },
    ],
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
