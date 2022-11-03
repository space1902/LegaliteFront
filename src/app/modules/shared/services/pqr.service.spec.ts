import { TestBed } from '@angular/core/testing';

import { PqrService } from './pqr.service';

describe('PqrService', () => {
  let service: PqrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
