import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { FirestoreService } from '../../services/firestore.service';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { NgIf } from '@angular/common';
import { FirestoreTestComponent } from '../firestore-test/firestore-test.component';
import { ProfileUserComponent } from '../profile-user/profile-user.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CreateChannelComponent,
    NgIf,
    ProfileUserComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  firestoreService: FirestoreService = inject(FirestoreService);
  online: boolean = true;
  clicked: boolean = true;
  showModal: boolean = false;
  channelArray = this.firestoreService.channelsArray;

  ngOnInit() {
    console.log(this.channelArray);
  }

  navBarClicked() {
    this.clicked = !this.clicked;
  }

  closeChannelWindow(close: boolean) {
    this.showModal = close;
  }
}
