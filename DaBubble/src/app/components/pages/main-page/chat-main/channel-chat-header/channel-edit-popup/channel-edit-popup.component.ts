import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { arrayRemove } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../../services/firestore.service';
import { MessagesDataService } from '../../../../../../services/messages-data.service';
import { ActivatedRoute } from '@angular/router';
import { DropdownComponent } from '../../../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../../../../shared/button/button.component';
import { ChannelsService } from '../../../../../../services/channels.service';
import { AppUser } from '../../../../../../types/types';

@Component({
  selector: 'app-channel-edit-popup',
  imports: [DropdownComponent, ButtonComponent, FormsModule, CommonModule],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ChannelEditPopupComponent {
  constructor(private route: ActivatedRoute) {
    this.getCurrentChannelCreatorData();
  }
  channelCreatorData: AppUser | null = null;
  creatorId: string = '';
  editChannelNameOpen: boolean = false;
  editDescriptionOpen: boolean = false;
  inputValue: string = ``;
  firestore = inject(FirestoreService);
  channelsService = inject(ChannelsService);

  /**
   * is this needed?
   */
  messageData = inject(MessagesDataService);

  @Input() channelName!: string;
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  onCloseClick() {
    this.closed.emit();
  }

  editName() {
    this.editChannelNameOpen = !this.editChannelNameOpen;
    if (!this.editChannelNameOpen) {
      this.updateCurrentChannelName();
    }
  }

  editDescriptionFN() {
        this.editDescriptionOpen = !this.editDescriptionOpen;
    if (!this.editDescriptionOpen) {
      this.updateCurrentChannelDescription();
    }
  }

  async leaveChannel() {
    const channelId = this.route.snapshot.paramMap.get('id');
    const userId = localStorage.getItem('id');

    if (!channelId || !userId) return;

    await this.firestore.updateDoc('channels', channelId, {
      userIds: arrayRemove(userId),
    });
    this.onCloseClick();
  }

  async getCurrentChannelCreatorId() {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.creatorId =
      (await this.channelsService.getChannelCreatorId(channelId!)) ?? '';
  }

  async getCurrentChannelCreatorData() {
    await this.getCurrentChannelCreatorId();

    const data = await this.firestore.getSingleCollection<AppUser>(
      'users',
      this.creatorId
    );
    if (data) {
      this.channelCreatorData = data;
    } else {
      console.warn('Creator not found!');
    }
  }

  async updateCurrentChannelName() {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.firestore.updateDoc('channels', channelId!, {
      channelName: this.inputValue,
    });
  }

  async updateCurrentChannelDescription() {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.firestore.updateDoc('channels', channelId!, {
      describetion: this.inputValue,
    });
  }
}
