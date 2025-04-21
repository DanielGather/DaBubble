import { Component, HostListener, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreTestComponent } from './components/firestore-test/firestore-test.component'; //test
import { HeaderComponent } from './components/shared/header/header.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FirestoreTestComponent, //test
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'DaBubble';

  /**
   * @param el variable to an elementreference
   * @param renderer variable to use the renderer, wich is used to give dynamic styles to specific elements.
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * this hostlistener listens to the reisize event. it will fire the function updateContentHeight
   * on resize, to refresh the height of the content element. 
   * 
   * @param event the resizeevent
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
      this.updateContentHeight();
  }

  ngAfterViewInit(): void {
    this.updateContentHeight();
  }

  /**
   * this function is used to give the element with the id content a new height based on flex-grow:1;.
   * it is needed because all childelements wich are using height:100%; are otherwise not be able to get the height from the content-element. 
   */
  updateContentHeight() {
    let contentElement = this.el.nativeElement.querySelector('#content');
    this.renderer.setStyle(contentElement, 'height', `auto`);
    this.renderer.setStyle(contentElement, 'height', `${contentElement.getBoundingClientRect().height}px`);    
  }
}
