import { TestBed } from '@angular/core/testing';

import { EditProfileOrganizationService } from './edit-profile-organization.service';

describe('EditProfileOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProfileOrganizationService = TestBed.get(EditProfileOrganizationService);
    expect(service).toBeTruthy();
  });
});
