import { TestBed } from '@angular/core/testing';

import { RegistrationIndividualService } from './registration-individual.service';

describe('RegistrationIndividualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationIndividualService = TestBed.get(RegistrationIndividualService);
    expect(service).toBeTruthy();
  });
});
