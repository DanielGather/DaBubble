import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelEditPopupComponent } from './channel-edit-popup.component';

describe('ChannelEditPopupComponent', () => {
  let component: ChannelEditPopupComponent;
  let fixture: ComponentFixture<ChannelEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelEditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
