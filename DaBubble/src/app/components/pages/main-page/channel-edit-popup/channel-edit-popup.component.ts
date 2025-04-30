import { Component } from '@angular/core';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-channel-edit-popup',
  imports: [DropdownComponent, ButtonComponent],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss'
})
export class ChannelEditPopupComponent {

}
