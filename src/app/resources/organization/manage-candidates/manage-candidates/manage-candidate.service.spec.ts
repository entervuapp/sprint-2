import { TestBed } from '@angular/core/testing';

import { ManageCandidateService } from './manage-candidate.service';

describe('ManageCandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageCandidateService = TestBed.get(ManageCandidateService);
    expect(service).toBeTruthy();
  });
});
