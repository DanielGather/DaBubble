import { TestBed } from '@angular/core/testing';

import { EmojiSubscribeService } from './emoji-subscribe.service';

describe('EmojiSubscribeService', () => {
  let service: EmojiSubscribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiSubscribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
