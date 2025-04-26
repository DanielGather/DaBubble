import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreTestComponent } from './components/firestore-test/firestore-test.component'; //test

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { PrivateChatComponent } from './components/pages/main-page/private-chat/private-chat.component';
import { HeaderComponent } from './components/pages/main-page/shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FirestoreTestComponent, //test
    HeaderComponent,
    SidebarComponent,
    AuthLayoutComponent,
    PrivateChatComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DaBubble';
}
