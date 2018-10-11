import { TestBed, inject } from '@angular/core/testing';

import { FakeDataGeneratorService } from './fake-data-generator.service';

describe('FakeDataGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeDataGeneratorService]
    });
  });

  it('should be created', inject([FakeDataGeneratorService], (service: FakeDataGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
