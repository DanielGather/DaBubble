import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppUser } from '../../../../../types/types';
import { FirestoreService } from '../../../../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private-chat-header',
  templateUrl: './private-chat-header.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './private-chat-header.component.scss',
  standalone: true,
})
export class PrivateChatHeaderComponent {
  chatPartnerId: string | null = null;
  chatPartnerData: AppUser | null = null; // ⬅️ Das war der Fehler!

  online: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.chatPartnerId = params.get('id');
      if (this.chatPartnerId) {
        this.loadChatPartnerData(this.chatPartnerId);
      }
    });
  }

async loadChatPartnerData(id: string) {
  const user = await this.firestore.getSingleCollection<AppUser>('users', id);
  if (user) {
    this.chatPartnerData = user;
    this.online = !!user.online;
    console.log('Chat-Partner-Daten:', this.chatPartnerData);
  } else {
    console.warn('User nicht gefunden!');
  }
}
}
