import { Component, inject } from '@angular/core';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

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

  rotation = 0;
  isRotated: boolean = false;
  isFolded: boolean = false;

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
}
