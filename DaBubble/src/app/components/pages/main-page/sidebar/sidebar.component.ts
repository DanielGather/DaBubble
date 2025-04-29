import { Component, inject } from '@angular/core';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users.service';
import { map } from 'rxjs';
import { AppUser } from '../../../../types/types';
import { Channels } from '../../../../types/types';
import { FoldItemState, FoldKey, FoldState } from '../../../../types/types';

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

  online: boolean = true;
  clicked: boolean = true;
  showModal: boolean = false;

  users: UsersService = inject(UsersService);

  channelList$: Observable<Channels[]> = this.firestoreService.channelsList$;

  usersList$: Observable<AppUser[]> = this.getSortedUser();

  DEFAULT_FOLD_ITEM: FoldItemState = {
    rotation: 0,
    isRotated: false,
    isFolded: false,
  };

  foldState: FoldState = {
    channel: { ...this.DEFAULT_FOLD_ITEM },
    contacts: { ...this.DEFAULT_FOLD_ITEM },
  };

  ngOnInit() {
    console.log(this.usersList$);
  }

  toggleFold(key: FoldKey) {
    const state = this.foldState[key];
    state.rotation += state.isRotated ? 90 : -90;
    state.isRotated = !state.isRotated;
    state.isFolded = !state.isFolded;
  }

  getSortedUser() {
    return this.users.usersList$.pipe(
      map((list) =>
        [...list].sort((a, b) =>
          a.firstName.localeCompare(b.firstName, 'de', { sensitivity: 'base' })
        )
      )
    );
  }

  navBarClicked() {
    this.clicked = !this.clicked;
  }

  closeChannelWindow(close: boolean) {
    this.showModal = close;
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
