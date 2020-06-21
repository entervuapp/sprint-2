import { TestBed } from '@angular/core/testing';

import { RegistrationOrganizationService } from './registration-organization.service';

describe('RegistrationOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationOrganizationService = TestBed.get(RegistrationOrganizationService);
    expect(service).toBeTruthy();
  });
});
