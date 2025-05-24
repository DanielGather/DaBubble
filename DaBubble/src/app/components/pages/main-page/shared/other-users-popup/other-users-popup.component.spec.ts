import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUsersPopupComponent } from './other-users-popup.component';

describe('OtherUsersPopupComponent', () => {
  let component: OtherUsersPopupComponent;
  let fixture: ComponentFixture<OtherUsersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherUsersPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
