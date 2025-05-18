import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelAdduserPopupComponent } from './channel-adduser-popup.component';

describe('ChannelAdduserPopupComponent', () => {
  let component: ChannelAdduserPopupComponent;
  let fixture: ComponentFixture<ChannelAdduserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelAdduserPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelAdduserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
