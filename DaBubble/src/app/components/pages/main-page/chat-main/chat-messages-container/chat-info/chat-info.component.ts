import { Component, Input, OnInit } from '@angular/core';
import { ChatType, AppUser } from '../../../../../../types/types';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../../../../services/firestore.service';

@Component({
  selector: 'app-chat-info',
  imports: [],
  templateUrl: './chat-info.component.html',
  styleUrl: './chat-info.component.scss',
  standalone: true,
})
export class ChatInfoComponent implements OnInit {
  @Input() chatTypeInput: ChatType = ChatType.default;

  chatPartnerData: AppUser | null = null;

  constructor(private route: ActivatedRoute, private firestore: FirestoreService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadChatPartnerData(id);
    }
  }

  async loadChatPartnerData(id: string) {
    const user = await this.firestore.getSingleCollection<AppUser>('users', id);
    if (user) {
      this.chatPartnerData = user;
    } else {
      console.warn('User nicht gefunden!');
    }
  }
}
