import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { arrayRemove } from '@angular/fire/firestore';
import { FirestoreService } from '../../../../../services/firestore.service';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route: ActivatedRoute) {}

  editChannel: boolean = false;
  editDescription: boolean = false;
  inputValue: string = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat nobis
voluptas non at consequuntur delectus accusamus veniam sit necessitatibus
nisi temporibus deserunt nulla aliquam tenetur perspiciatis natus, ea
doloremque.`;
  firestore = inject(FirestoreService);
  messageData = inject(MessagesDataService);

  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  onCloseClick() {
    this.closed.emit();
  }

  edit(button: string) {
    if (button == 'edit') {
      this.editChannel = !this.editChannel;
    } else {
      this.editDescription = !this.editDescription;
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
}
