import { TestBed } from '@angular/core/testing';

import { Ipv4managerService } from './ipv4manager.service';

describe('Ipv4managerService', () => {
  let service: Ipv4managerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ipv4managerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
