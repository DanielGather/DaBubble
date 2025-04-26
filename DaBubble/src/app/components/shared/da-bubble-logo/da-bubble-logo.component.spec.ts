import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaBubbleLogoComponent } from './da-bubble-logo.component';

describe('DaBubbleLogoComponent', () => {
  let component: DaBubbleLogoComponent;
  let fixture: ComponentFixture<DaBubbleLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaBubbleLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaBubbleLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
