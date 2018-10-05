import { TestBed, inject } from '@angular/core/testing';

import { NlogService } from './nlog.service';

describe('NlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NlogService]
    });
  });

  it('should be created', inject([NlogService], (service: NlogService) => {
    expect(service).toBeTruthy();
  }));
});
