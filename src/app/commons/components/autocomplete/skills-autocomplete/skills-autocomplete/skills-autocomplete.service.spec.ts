import { TestBed } from '@angular/core/testing';

import { SkillsAutocompleteService } from './skills-autocomplete.service';

describe('SkillsAutocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillsAutocompleteService = TestBed.get(SkillsAutocompleteService);
    expect(service).toBeTruthy();
  });
});
