import { Routes } from '@angular/router';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
PrivateChatComponent;

export const routes: Routes = [
  { path: 'a-private-chat-variable', component: PrivateChatComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];
