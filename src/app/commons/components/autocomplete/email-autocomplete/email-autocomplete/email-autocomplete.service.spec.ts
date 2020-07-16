import { TestBed } from '@angular/core/testing';

import { EmailAutocompleteService } from './email-autocomplete.service';

describe('EmailAutocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailAutocompleteService = TestBed.get(EmailAutocompleteService);
    expect(service).toBeTruthy();
  });
});
