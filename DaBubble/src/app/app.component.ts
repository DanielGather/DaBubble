import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreTestComponent } from './components/firestore-test/firestore-test.component'; //test

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FirestoreTestComponent, //test
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DaBubble';
}
