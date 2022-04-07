import { TestBed } from '@angular/core/testing';

import { ApproveOrgDataService } from './approve-org-data.service';

describe('ApproveOrgDataService', () => {
  let service: ApproveOrgDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveOrgDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
