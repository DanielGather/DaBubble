import { TestBed } from '@angular/core/testing';

import { MessagesDataService } from './messages-data.service';

describe('MessagesDataService', () => {
  let service: MessagesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
