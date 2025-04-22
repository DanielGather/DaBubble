import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';

@Component({
  selector: 'app-sidebar',
  imports: [HeaderComponent, SearchbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  online: boolean = true;
  clicked: boolean = true;

  navBarClicked() {
    this.clicked = !this.clicked;
  }

  addNewChannel() {}
}
