import { TestBed } from '@angular/core/testing';

import { GetUrlChatidService } from './get-url-chatid.service';

describe('GetUrlChatidService', () => {
  let service: GetUrlChatidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUrlChatidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
