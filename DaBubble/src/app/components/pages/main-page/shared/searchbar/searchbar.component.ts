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

  openModal() {
    this.isModalOpen = true;
  }

  onChange(event: any) {
    console.log('event', event.target.value);
    if (event.target.value) {
      this.isModalOpen = true;
    } else this.isModalOpen = false;
  }
}
