import { TestBed } from '@angular/core/testing';

import { VesselDataService } from './vessel-data.service';

describe('VesselDataService', () => {
  let service: VesselDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
