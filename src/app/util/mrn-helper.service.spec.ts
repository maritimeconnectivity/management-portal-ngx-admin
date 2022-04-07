import { TestBed } from '@angular/core/testing';

import { MrnHelperService } from './mrn-helper.service';

describe('MrnHelperService', () => {
  let service: MrnHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrnHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
