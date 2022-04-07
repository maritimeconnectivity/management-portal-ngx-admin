import { TestBed } from '@angular/core/testing';

import { ApproveSvcDataService } from './approve-svc-data.service';

describe('ApproveSvcDataService', () => {
  let service: ApproveSvcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveSvcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
