import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreTestComponent } from './components/firestore-test/firestore-test.component'; //test
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { PrivateChatComponent } from './components/pages/main-page/private-chat/private-chat.component';
import { HeaderComponent } from './components/pages/main-page/shared/header/header.component';
import { SidebarComponent } from './components/pages/main-page/sidebar/sidebar.component';

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
