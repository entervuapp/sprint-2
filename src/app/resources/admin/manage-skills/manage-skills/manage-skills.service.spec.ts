import { TestBed } from '@angular/core/testing';

import { ManageSkillsService } from './manage-skills.service';

describe('ManageSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageSkillsService = TestBed.get(ManageSkillsService);
    expect(service).toBeTruthy();
  });
});
