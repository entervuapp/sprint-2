import { TestBed } from '@angular/core/testing';

import { ManageHeaderService } from './manage-header.service';

describe('ManageHeaderService', () => {
  let service: ManageHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
