import { Component, Output, inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { FirestoreService } from '../../../../../services/firestore.service';
import { UsersService } from '../../../../../services/users.service';

@Component({
  selector: 'app-create-channel',
  imports: [ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
export class CreateChannelComponent {
  constructor(private fb: FormBuilder) {}
  firestore: FirestoreService = inject(FirestoreService);
  usersService: UsersService = inject(UsersService)
  @Output() showModal = new EventEmitter<boolean>();

  channelForm!: FormGroup;

  ngOnInit() {
    console.log("Ich bin im Create Channel",this.usersService.userChatDataObject);
    
    this.channelForm = this.fb.group({
      createChannel: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  closeModal() {
    this.showModal.emit(false);
  }


  /**
   * wenn auf add doc auf setdoc umgestellt sparen wir uns add doc im service da nur hier verwendedt
   */
  onSubmit() {
    let userId = localStorage.getItem('id')
    if (this.channelForm.valid) {
      console.log(this.channelForm.value);
      // console.log(this.channelForm.get('createChannel')?.value);
      // console.log(this.channelForm.get('description')?.value);
      this.firestore.addDoc('channels', {
        channelName: this.channelForm.get('createChannel')?.value,
        description: this.channelForm.get('description')?.value,
        userIds: [userId],
      });
      this.closeModal();
    }
  }
}
