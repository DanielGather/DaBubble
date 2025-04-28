import { Component, inject } from '@angular/core';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users.service';
import { User } from 'firebase/auth';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { AppUser } from '../../../../types/types';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SearchbarComponent, CreateChannelComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('foldAnimation', [
      transition(':enter', [
        style({ transform: 'scaleY(0)', opacity: 0 }),
        animate('300ms', style({ transform: 'scaleY(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'scaleY(0)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarComponent {
  firestoreService: FirestoreService = inject(FirestoreService);
  rotation = 0;
  online: boolean = true;
  clicked: boolean = true;
  showModal: boolean = false;
  isRotated: boolean = false;
  isFolded: boolean = false;
  users: UsersService = inject(UsersService);
  channelArray = this.firestoreService.channelsArray;
  usersList$: Observable<AppUser[]> = this.users.usersList$;

  ngOnInit() {
    console.log(this.channelArray);
    console.log(this.usersList$);
  }

  navBarClicked() {
    this.clicked = !this.clicked;
  }

  closeChannelWindow(close: boolean) {
    this.showModal = close;
  }

  foldIn() {
    this.makeRotation();
    this.isFolded = !this.isFolded;
  }

  makeRotation() {
    if (!this.isRotated) {
      this.rotation = this.rotation - 90;
    } else {
      this.rotation = this.rotation + 90;
    }
    this.isRotated = !this.isRotated;
  }

  getAvatar(avatarId: number) {
    switch (avatarId) {
      case 1:
        return 'img/user_1.png';
      case 2:
        return 'img/user_2.png';
      case 3:
        return 'img/user_3.png';
      case 4:
        return 'img/user_4.png';
      case 5:
        return 'img/user_5.png';
      case 6:
        return 'img/user_6.png';
    }
    return 'img/user_1.png';
  }
}
