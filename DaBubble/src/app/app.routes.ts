import { Routes } from '@angular/router';

import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/pages/legal-notice/legal-notice.component';
import { PrivateChatComponent } from './components/pages/main-page/private-chat/private-chat.component';

export const routes: Routes = [
  { path: 'a-private-chat-variable', component: PrivateChatComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];
