import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmojiComponent } from './single-emoji.component';

describe('SingleEmojiComponent', () => {
  let component: SingleEmojiComponent;
  let fixture: ComponentFixture<SingleEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleEmojiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
