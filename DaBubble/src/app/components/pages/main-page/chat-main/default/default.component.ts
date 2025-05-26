import { Component } from '@angular/core';
import { SearchbarComponent } from '../../shared/searchbar/searchbar.component';

@Component({
  selector: 'app-default',
  imports: [SearchbarComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
