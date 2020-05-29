import { TestBed } from '@angular/core/testing';

import { ManageEventsService } from './manage-events.service';

describe('ManageEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageEventsService = TestBed.get(ManageEventsService);
    expect(service).toBeTruthy();
  });
});
