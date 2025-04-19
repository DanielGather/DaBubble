import { Component, Inject, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectOptionComponent } from './select-option/select-option.component';
import { doc } from '@angular/fire/firestore';



@Component({
  selector: 'app-firestore-test',
  imports: [
    CommonModule,
    FormsModule,
    SelectOptionComponent
  ],
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

  /**
   * variable to store the title of the selected document
   */
  selectedDocTitle:string = '';

  /**
   * the variable wich will store the new value for the selected document 
   */
  newDocumentValue:string = '';
  

  constructor() {}

  
  /**
   * is used to select a document from the list of the html template
   * @param docTitle sets the selected docTitle
   */
  selectDoc(docTitle:string) {
    this.selectedDocTitle = docTitle;
  }

  // test
  logValue() {
    console.log(this.newDocumentValue);
    this.selectedDocTitle = '';
    this.newDocumentValue = '';
  }
  // testend
  

  
}
