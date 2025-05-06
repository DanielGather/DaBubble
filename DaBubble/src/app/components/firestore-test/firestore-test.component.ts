import { Component, Inject, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectOptionComponent } from './select-option/select-option.component';
import {
  doc,
  docData,
  collectionData,
  updateDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-firestore-test',
  imports: [CommonModule, FormsModule, SelectOptionComponent],
  templateUrl: './firestore-test.component.html',
  styleUrl: './firestore-test.component.scss',
})
export class FirestoreTestComponent {
  /**
   * firstoreService variable
   */
  firestoreService: FirestoreService = inject(FirestoreService);

  /**
   * array of user messages
   */
  userMessages: any;
  userId: number = 123123;

  async ngOnInit() {
    // this.userMessages = await this.firestoreService.fetchUserMessages(
    //   this.userId
    // );
  }

  /**
   * variable to access the data of the collection
   */
  collection$ = this.firestoreService.getCollectionData('test-collection');

  /**
   * variable to store the title of the selected document
   */
  selectedDocTitle: string = 'Das ist ein merge test';

  /**
   * the variable wich will store the new value for the selected document
   */
  newDocumentValue: string = '';

  constructor() {}

  /**
   * is used to select a document from the list of the html template
   * @param docTitle sets the selected docTitle
   */
  selectDoc(docTitle: string) {
    this.selectedDocTitle = docTitle;
  }

  /**
   * this function submits the form wich will update the selected document, with the values from the form input (text-area field).
   *
   */
  submitChange() {
    const newValueObject = {
      title: this.selectedDocTitle,
      value: this.newDocumentValue,
    };

    this.firestoreService.updateDoc(
      'test-collection',
      this.selectedDocTitle,
      newValueObject
    );
    this.selectedDocTitle = '';
    this.newDocumentValue = '';
  }
}
