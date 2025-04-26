import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalsLayoutComponent } from './legals-layout.component';

describe('LegalsLayoutComponent', () => {
  let component: LegalsLayoutComponent;
  let fixture: ComponentFixture<LegalsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
