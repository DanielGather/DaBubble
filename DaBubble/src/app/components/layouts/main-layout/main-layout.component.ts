import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../pages/main-page/sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThreadsbarComponent } from '../../pages/main-page/threadsbar/threadsbar.component';
import { ChatMainComponent } from '../../pages/main-page/chat-main/chat-main.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    ChatMainComponent,
    RouterLink,
    RouterOutlet,
    ThreadsbarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
