import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadsbarComponent } from './threadsbar.component';

describe('ThreadsbarComponent', () => {
  let component: ThreadsbarComponent;
  let fixture: ComponentFixture<ThreadsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadsbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
