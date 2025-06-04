import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';

@Component({
  selector: 'app-searchbar',
  imports: [CommonModule, SearchDropdownComponent, SearchDropdownComponent],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  @Input() padding: boolean = true;
  isModalOpen = false;
  searchUser = false;
  searchChannel = false;

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
    } else if (event.target.value.charAt(0) == '#') {
      this.searchChannel = true;
      this.searchUser = false;
    } else {
      this.searchUser = false;
      this.searchChannel = false;
    }
  }
}
