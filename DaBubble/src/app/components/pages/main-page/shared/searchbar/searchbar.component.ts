import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Input() padding: boolean = true;
}
