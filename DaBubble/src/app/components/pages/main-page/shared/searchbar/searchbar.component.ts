import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';
import { OtherUsersPopupComponent } from '../other-users-popup/other-users-popup.component';

@Component({
  selector: 'app-searchbar',
  imports: [
    CommonModule,
    SearchDropdownComponent,
    SearchDropdownComponent,
    OtherUsersPopupComponent,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  @Input() padding: boolean = true;
  isModalOpen = false;
  searchUser = false;
  searchChannel = false;
  searchTerm: string = '';

  openModal() {
    this.isModalOpen = true;
  }

  onChange(event: any) {
    if (event.target.value) {
      this.isModalOpen = true;
      this.checkIfUserOrChannel(event);
    } else this.isModalOpen = false;
  }

  checkIfUserOrChannel(event: any) {
    if (event.target.value.charAt(0) == '@') {
      this.searchUser = true;
      this.searchChannel = false;
      this.searchTerm =
        event.target.value.length > 0 ? event.target.value.substring(1) : '';
    } else if (event.target.value.charAt(0) == '#') {
      this.searchChannel = true;
      this.searchUser = false;
      this.searchTerm =
        event.target.value.length > 0 ? event.target.value.substring(1) : '';
    } else {
      this.searchUser = false;
      this.searchChannel = false;
      this.searchTerm = event.target.value;
    }
    console.log('danach wird gesucht', this.searchTerm);
  }
}
