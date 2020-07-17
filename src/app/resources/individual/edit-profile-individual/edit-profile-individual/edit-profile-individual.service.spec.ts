import { TestBed } from '@angular/core/testing';

import { EditProfileIndividualService } from './edit-profile-individual.service';

describe('EditProfileIndividualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProfileIndividualService = TestBed.get(EditProfileIndividualService);
    expect(service).toBeTruthy();
  });
});
