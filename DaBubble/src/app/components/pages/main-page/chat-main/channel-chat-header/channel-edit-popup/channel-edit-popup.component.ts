import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { arrayRemove } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../../services/firestore.service';
import { MessagesDataService } from '../../../../../../services/messages-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownComponent } from '../../../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../../../../shared/button/button.component';
import { ChannelsService } from '../../../../../../services/channels.service';
import { AppUser } from '../../../../../../types/types';
import { OtherUsersPopupComponent } from '../../../shared/other-users-popup/other-users-popup.component';
import { ProfileUserComponent } from '../../../shared/profile-user/profile-user.component';

@Component({
  selector: 'app-channel-edit-popup',
  imports: [
    DropdownComponent,
    ButtonComponent,
    FormsModule,
    CommonModule,
    OtherUsersPopupComponent,
    ProfileUserComponent
  ],
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
  constructor(private route: ActivatedRoute, private router: Router) {
    this.getCurrentChannelCreatorData();
  }
  @Input() set channelName(value: string) {
    this.channelNameSignal.set(value);
  }
  @Input() set channelDescription(value: string) {
    this.channelDescriptionSignal.set(value);
  }

  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  userPopupVisible = false;

  channelCreatorData: AppUser | null = null;
  creatorId: string = '';
  editChannelNameOpen: boolean = false;
  editDescriptionOpen: boolean = false;
  firestore = inject(FirestoreService);
  channelsService = inject(ChannelsService);
  channelNameSignal = signal(''); // kommt per @Input()
  channelNameWithHash = computed(() => `# ${this.channelNameSignal()}`);
  channelDescriptionSignal = signal('');
  /**
   * is this needed?
   */
  messageData = inject(MessagesDataService);

  onCloseClick() {
    this.closed.emit();
  }

  editChannelName() {
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
    this.router.navigate(['/chat']);
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
    const newName = this.channelNameSignal();
    await this.firestore.updateDoc('channels', channelId!, {
      channelName: newName,
    });
  }

  async updateCurrentChannelDescription() {
    const channelId = this.route.snapshot.paramMap.get('id');
    const newDescription = this.channelDescriptionSignal();
    await this.firestore.updateDoc('channels', channelId!, {
      description: newDescription,
    });
  }

  toggleClickedUserPopup() {
    this.userPopupVisible = !this.userPopupVisible;
  }
}
