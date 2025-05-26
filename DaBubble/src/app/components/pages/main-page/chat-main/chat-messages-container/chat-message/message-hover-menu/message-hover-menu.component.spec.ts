import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHoverMenuComponent } from './message-hover-menu.component';

describe('MessageHoverMenuComponent', () => {
  let component: MessageHoverMenuComponent;
  let fixture: ComponentFixture<MessageHoverMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageHoverMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHoverMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
