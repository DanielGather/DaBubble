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

@Component({
  selector: 'app-create-channel',
  imports: [ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
export class CreateChannelComponent {
  constructor(private fb: FormBuilder) {}
  firestore: FirestoreService = inject(FirestoreService);
  @Output() showModal = new EventEmitter<boolean>();

  channelForm!: FormGroup;

  ngOnInit() {
    this.channelForm = this.fb.group({
      createChannel: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  closeModal() {
    this.showModal.emit(false);
  }

  onSubmit() {
    if (this.channelForm.valid) {
      console.log(this.channelForm.value);
      // console.log(this.channelForm.get('createChannel')?.value);
      // console.log(this.channelForm.get('description')?.value);
      this.firestore.addDoc('channels', {
        channelName: this.channelForm.get('createChannel')?.value,
        description: this.channelForm.get('description')?.value,
        userIds: [123],
      });
      this.closeModal();
    }
  }
}
