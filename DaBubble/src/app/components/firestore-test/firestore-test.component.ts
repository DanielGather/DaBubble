import { Component, Inject, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-firestore-test',
  imports: [CommonModule],
  templateUrl: './firestore-test.component.html',
  styleUrl: './firestore-test.component.scss',
})
export class FirestoreTestComponent {
  /**
   * firstoreService variable
   */
  firestoreService: FirestoreService = inject(FirestoreService);

  /**
   * variable to access the data of the collection
   */
  collection$ = this.firestoreService.getCollectionData('test-collection');

  constructor() {}
}
