import { TestBed } from '@angular/core/testing';

import { ManageHrTeamService } from './manage-hr-team.service';

describe('ManageHrTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageHrTeamService = TestBed.get(ManageHrTeamService);
    expect(service).toBeTruthy();
  });
});
