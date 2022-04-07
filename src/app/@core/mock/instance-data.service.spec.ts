import { TestBed } from '@angular/core/testing';

import { InstanceDataService } from './instance-data.service';

describe('InstanceDataService', () => {
  let service: InstanceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
